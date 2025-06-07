package com.example.bridgeapp.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class Bridge(
    val bridgeId: Int,
    val name: String,
    val description: String,
    val bridgeType: String,
    val location: String,
    val status: String,
    val creationDate: String,
    val sensors: List<Sensor>? = null,
    val inspectors: List<Inspector>? = null
)

@Serializable
data class Sensor(
    val sensorId: Int,
    val name: String,
    val description: String? = null,
    val location: String? = null,
    val installationDate: String? = null,
    val bridgeId: Int,
    val sensorTypeId: Int,
    val sensorType: SensorType? = null,
    val sensorDatas: List<SensorData>? = null,
    val status: String = "Невідомо"
)

@Serializable
data class SensorType(
    val sensorTypeId: Int,
    val name: String,
    val description: String? = null,
    val measurementValue: String? = null
)

@Serializable
data class SensorData(
    val sensorDataId: Int,
    val value: Double,
    @SerialName("date") val date: String,
    val sensorId: Int
)

@Serializable
data class Inspector(
    val inspectorId: Int,
    val name: String,
    val role: String,
    val contact: String? = null
)

