package com.example.bridgeapp.navigation

import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.bridgeapp.ui.screens.BridgeDetailScreen
import com.example.bridgeapp.ui.screens.BridgeListScreen
import com.example.bridgeapp.viewmodel.BridgeViewModel

@Composable
fun BridgeNavigation(
    navController: NavHostController = rememberNavController(),
    viewModel: BridgeViewModel = viewModel()
) {
    NavHost(
        navController = navController,
        startDestination = "bridge_list"
    ) {
        composable("bridge_list") {
            BridgeListScreen(
                viewModel = viewModel,
                onBridgeClick = { bridge ->
                    navController.navigate("bridge_detail/${bridge.bridgeId}")
                }
            )
        }

        composable("bridge_detail/{bridgeId}") { backStackEntry ->
            val bridgeId = backStackEntry.arguments?.getString("bridgeId")?.toIntOrNull() ?: 0
            BridgeDetailScreen(
                bridgeId = bridgeId,
                viewModel = viewModel,
                onBackClick = {
                    navController.popBackStack()
                }
            )
        }
    }
}