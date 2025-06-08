from locust import HttpUser, task, between

class BridgeUser(HttpUser):
    wait_time = between(1, 3)

    @task(3)
    def get_bridges(self):
        self.client.get("/api/bridges")

    @task(1)
    def get_sensors(self):
        self.client.get("/api/sensors")