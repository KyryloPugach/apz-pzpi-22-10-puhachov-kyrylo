package com.example.bridgeapp.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.bridgeapp.model.Bridge
import com.example.bridgeapp.ui.components.BridgeCard
import com.example.bridgeapp.viewmodel.BridgeViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BridgeListScreen(
    viewModel: BridgeViewModel,
    onBridgeClick: (Bridge) -> Unit
) {
    LaunchedEffect(Unit) {
        viewModel.loadBridges()
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Мости") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer
                )
            )
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            when {
                viewModel.isLoading -> {
                    CircularProgressIndicator(
                        modifier = Modifier.align(Alignment.Center)
                    )
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
                        Button(
                            onClick = {
                                viewModel.clearError()
                                viewModel.loadBridges()
                            }
                        ) {
                            Text("Повторити")
                        }
                    }
                }

                viewModel.bridges.isEmpty() -> {
                    Text(
                        text = "Мости не знайдені",
                        modifier = Modifier.align(Alignment.Center),
                        style = MaterialTheme.typography.bodyLarge
                    )
                }

                else -> {
                    LazyColumn(
                        modifier = Modifier.fillMaxSize(),
                        contentPadding = PaddingValues(16.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        items(viewModel.bridges) { bridge ->
                            BridgeCard(
                                bridge = bridge,
                                onClick = onBridgeClick
                            )
                        }
                    }
                }
            }
        }
    }
}