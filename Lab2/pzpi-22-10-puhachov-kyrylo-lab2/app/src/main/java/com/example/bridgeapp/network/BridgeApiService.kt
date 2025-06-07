package com.example.bridgeapp.network

import com.example.bridgeapp.model.Bridge
import retrofit2.Response
import retrofit2.http.*

interface BridgeApiService {
    @GET("api/bridges")
    suspend fun getBridges(): Response<List<Bridge>>

    @GET("api/bridges/{id}")
    suspend fun getBridge(@Path("id") id: Int): Response<Bridge>

    @POST("api/bridges")
    suspend fun createBridge(@Body bridge: Bridge): Response<Bridge>

    @PUT("api/bridges/{id}")
    suspend fun updateBridge(@Path("id") id: Int, @Body bridge: Bridge): Response<Unit>

    @DELETE("api/bridges/{id}")
    suspend fun deleteBridge(@Path("id") id: Int): Response<Unit>
}