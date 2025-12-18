package main

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

func main() {
	InitDatabase()

	router := gin.Default()

	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})

	api := router.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		})

		devices := api.Group("/devices")
		{
			devices.GET("", GetAllDevices)
			devices.GET("/:id", GetDeviceByID)
			devices.GET("/era/:era", GetDevicesByEra)
		}
	}

	// Static files
	router.Static("/static/models", "./models")
	router.Static("/models", "./models")
	router.Static("/css", "../frontend/css")
	router.Static("/js", "../frontend/js")
	router.Static("/icons", "../frontend/icons")
	router.Static("/images", "../frontend/images")
	router.Static("/screenshots", "../frontend/screenshots")

	router.StaticFile("/manifest.json", "../frontend/manifest.json")
	router.StaticFile("/service-worker.js", "../frontend/service-worker.js")
	router.StaticFile("/favicon.png", "../frontend/favicon.png")
	router.StaticFile("/icon-192.png", "../frontend/icon-192.png")

	// HTML pages
	router.StaticFile("/ar-viewer.html", "../frontend/ar-viewer.html")
	router.StaticFile("/detail.html", "../frontend/detail.html")
	router.StaticFile("/credits.html", "../frontend/credits.html")

	// Serve index.html hanya untuk root
	router.GET("/", func(c *gin.Context) {
		c.File("../frontend/index.html")
	})

	router.NoRoute(func(c *gin.Context) {
		if strings.HasPrefix(c.Request.URL.Path, "/api") {
			c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
			return
		}
		c.File("../frontend/index.html")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	if strings.HasPrefix(port, ":") {
		port = strings.TrimPrefix(port, ":")
	}

	log.Printf("Server running on http://localhost:%s\n", port)
	router.Run(":" + port)
}
