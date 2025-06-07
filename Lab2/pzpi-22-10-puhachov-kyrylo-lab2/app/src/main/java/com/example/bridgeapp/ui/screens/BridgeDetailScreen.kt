package com.example.bridgeapp.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bridgeapp.model.Bridge
import com.example.bridgeapp.viewmodel.BridgeViewModel
import java.text.SimpleDateFormat
import java.util.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BridgeDetailScreen(
    bridgeId: Int,
    viewModel: BridgeViewModel,
    onBackClick: () -> Unit
) {
    LaunchedEffect(bridgeId) {
        viewModel.loadBridge(bridgeId)
    }

    Scaffold(
        topBar = {
            LargeTopAppBar(
                title = {
                    Text(
                        viewModel.selectedBridge?.name ?: "Деталі мосту",
                        fontWeight = FontWeight.Bold
                    )
                },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Назад")
                    }
                },
                colors = TopAppBarDefaults.largeTopAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surfaceContainerHigh
                )
            )
        }
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            when {
                viewModel.isLoading -> {
                    CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                }

                viewModel.error != null -> {
                    Column(
                        modifier = Modifier.align(Alignment.Center),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = viewModel.error ?: "",
                            color = MaterialTheme.colorScheme.error
                        )
                        Spacer(modifier = Modifier.height(16.dp))
                        Button(onClick = {
                            viewModel.clearError()
                            viewModel.loadBridge(bridgeId)
                        }) {
                            Text("Повторити")
                        }
                    }
                }

                viewModel.selectedBridge != null -> {
                    AnimatedVisibility(
                        visible = true,
                        enter = fadeIn(tween(400)),
                        exit = fadeOut(tween(400))
                    ) {
                        BridgeDetailContent(viewModel.selectedBridge!!)
                    }
                }
            }
        }
    }
}

@Composable
private fun BridgeDetailContent(bridge: Bridge) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(20.dp)
    ) {
        ElevatedCard(title = "Основна інформація", icon = Icons.Default.Info) {
            InfoRow("Назва", bridge.name)
            InfoRow("Опис", bridge.description)
            InfoRow("Тип", bridge.bridgeType)
            InfoRow("Місцезнаходження", bridge.location)
            InfoRow("Статус", bridge.status)
            InfoRow("Дата створення", formatDate(bridge.creationDate))
        }

        ElevatedCard(title = "Датчики", icon = Icons.Default.Sensors) {
            bridge.sensors?.takeIf { it.isNotEmpty() }?.forEach { sensor ->
                SensorItem(sensor)
                Divider(modifier = Modifier.padding(vertical = 8.dp))
            } ?: Text("Датчики не знайдені", color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        ElevatedCard(title = "Інспектори", icon = Icons.Default.PersonSearch) {
            bridge.inspectors?.takeIf { it.isNotEmpty() }?.forEach { inspector ->
                InspectorItem(inspector)
                Divider(modifier = Modifier.padding(vertical = 8.dp))
            } ?: Text("Інспектори не призначені", color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}

@Composable
private fun ElevatedCard(title: String, icon: ImageVector, content: @Composable ColumnScope.() -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        elevation = CardDefaults.cardElevation(6.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceContainerLow)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(icon, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                Spacer(modifier = Modifier.width(8.dp))
                Text(title, fontWeight = FontWeight.Bold, fontSize = 18.sp)
            }
            Spacer(modifier = Modifier.height(12.dp))
            content()
        }
    }
}

@Composable
private fun InfoRow(label: String, value: String) {
    Column(modifier = Modifier.padding(vertical = 4.dp)) {
        Text(label, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.primary)
        Text(value, style = MaterialTheme.typography.bodyMedium)
    }
}

@Composable
private fun SensorItem(sensor: com.example.bridgeapp.model.Sensor) {
    Column {
        Text(sensor.name, fontWeight = FontWeight.Medium)
        Text("Тип: ${sensor.sensorType?.name ?: "—"}", fontSize = 13.sp)
        Text("Опис: ${sensor.description ?: "—"}", fontSize = 13.sp)
        Text("Локація: ${sensor.location ?: "—"}", fontSize = 13.sp)
        Text("Встановлено: ${sensor.installationDate?.let { formatDate(it) } ?: "—"}", fontSize = 13.sp)
        Text("Статус: ${sensor.status ?: "—"}", fontSize = 13.sp)
        val latest = sensor.sensorDatas?.maxByOrNull { it.date }
        latest?.let {
            Text("Останнє значення: ${it.value} (${formatDate(it.date)})", fontSize = 13.sp, color = MaterialTheme.colorScheme.primary)
        }
    }
}

@Composable
private fun InspectorItem(inspector: com.example.bridgeapp.model.Inspector) {
    Column {
        Text(inspector.name, fontWeight = FontWeight.Medium)
        Text("Роль: ${inspector.role}", fontSize = 13.sp)
        Text("Контакт: ${inspector.contact}", fontSize = 13.sp)
    }
}

private fun formatDate(dateString: String): String {
    return try {
        val inputFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
        val outputFormat = SimpleDateFormat("dd.MM.yyyy HH:mm", Locale.getDefault())
        val date = inputFormat.parse(dateString)
        outputFormat.format(date ?: Date())
    } catch (e: Exception) {
        dateString
    }
}