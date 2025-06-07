package com.example.bridgeapp.repository

import com.example.bridgeapp.model.Bridge
import com.example.bridgeapp.network.ApiClient
import retrofit2.Response

class BridgeRepository {
    private val apiService = ApiClient.bridgeApiService

    suspend fun getBridges(): Response<List<Bridge>> = apiService.getBridges()

    suspend fun getBridge(id: Int): Response<Bridge> = apiService.getBridge(id)

    suspend fun createBridge(bridge: Bridge): Response<Bridge> = apiService.createBridge(bridge)

    suspend fun updateBridge(id: Int, bridge: Bridge): Response<Unit> =
        apiService.updateBridge(id, bridge)

    suspend fun deleteBridge(id: Int): Response<Unit> = apiService.deleteBridge(id)
}