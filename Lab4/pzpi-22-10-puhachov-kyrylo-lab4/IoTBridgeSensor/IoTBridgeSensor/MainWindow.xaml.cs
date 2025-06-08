using System.Net.Http;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using static System.Net.Mime.MediaTypeNames;

namespace IoTBridgeSensor
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var idText = idInput.Text;
            var valueText = valueInput.Text;

            var idParsed = int.TryParse(idText, out var id);
            var date = DateTime.Now;

            if (idParsed)
            {
                var bridgeData = new SensorData()
                {
                    Date = date,
                    SensorId = id,
                    Value = valueText,
                };

                using (var client = new HttpClient())
                {
                    string url = "https://localhost:5001/api/SensorDatas/";
                    var request = new HttpRequestMessage(new HttpMethod("POST"), url);

                    try
                    {
                        // Serialize bridgeData to JSON
                        var json = System.Text.Json.JsonSerializer.Serialize(bridgeData);
                        request.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                        // Send the request
                        var response = client.SendAsync(request).Result;

                        if (response.IsSuccessStatusCode)
                        {
                            MessageBox.Show("Data sent successfully!");
                        }
                        else
                        {
                            MessageBox.Show($"Error: {response.StatusCode}");
                        }
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Error. Message: " + ex.Message);
                    }
                }
            }
            else
            {
                MessageBox.Show("Invalid Sensor ID. Please enter a valid integer.");
            }
        }

        public class SensorData
        {
            public DateTime Date { get; set; }
            public string Value { get; set; }
            public int SensorId { get; set; }
        }
    }
}