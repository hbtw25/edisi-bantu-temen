package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllDevices(c *gin.Context) {
	var devices []Device
	result := DB.Where("deleted_at IS NULL").Find(&devices) // ✅ GANTI jadi DB

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": result.Error.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   devices,
	})
}

func GetDeviceByID(c *gin.Context) {
	id := c.Param("id")

	var device Device

	result := DB.Where("LOWER(name) LIKE ? AND deleted_at IS NULL", "%"+id+"%").First(&device)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  "error",
			"message": "Device not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   device,
	})
}

func GetDevicesByEra(c *gin.Context) {
	era := c.Param("era")

	var devices []Device
	result := DB.Where("era = ? AND deleted_at IS NULL", era).Find(&devices) // ✅ GANTI jadi DB

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": result.Error.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   devices,
	})
}
