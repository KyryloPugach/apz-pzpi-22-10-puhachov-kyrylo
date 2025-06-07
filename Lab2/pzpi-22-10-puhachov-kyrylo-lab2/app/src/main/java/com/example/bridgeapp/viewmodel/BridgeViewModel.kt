package com.example.bridgeapp.viewmodel

import androidx.compose.runtime.*
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.bridgeapp.model.Bridge
import com.example.bridgeapp.repository.BridgeRepository
import kotlinx.coroutines.launch

class BridgeViewModel : ViewModel() {
    private val repository = BridgeRepository()

    var bridges by mutableStateOf<List<Bridge>>(emptyList())
        private set

    var selectedBridge by mutableStateOf<Bridge?>(null)
        private set

    var isLoading by mutableStateOf(false)
        private set

    var error by mutableStateOf<String?>(null)
        private set

    fun loadBridges() {
        viewModelScope.launch {
            isLoading = true
            error = null
            try {
                val response = repository.getBridges()
                if (response.isSuccessful) {
                    bridges = response.body() ?: emptyList()
                } else {
                    error = "Помилка завантаження: ${response.code()}"
                }
            } catch (e: Exception) {
                error = "Помилка мережі: ${e.message}"
            } finally {
                isLoading = false
            }
        }
    }

    fun loadBridge(id: Int) {
        viewModelScope.launch {
            isLoading = true
            error = null
            try {
                val response = repository.getBridge(id)
                if (response.isSuccessful) {
                    selectedBridge = response.body()
                } else {
                    error = "Помилка завантаження моста: ${response.code()}"
                }
            } catch (e: Exception) {
                error = "Помилка мережі: ${e.message}"
            } finally {
                isLoading = false
            }
        }
    }

    fun clearError() {
        error = null
    }
}
