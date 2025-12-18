package main

import "gorm.io/gorm"

type Device struct {
	gorm.Model
	Name         string `gorm:"column:name" json:"name"`
	Year         int    `gorm:"column:year" json:"year"`
	Category     string `gorm:"column:category" json:"category"`
	Era          string `gorm:"column:era" json:"era"`
	Manufacturer string `gorm:"column:manufacturer" json:"manufacturer"`
	Description  string `gorm:"column:description" json:"description"`
	Impact       string `gorm:"column:impact" json:"impact"`
	Processor    string `gorm:"column:processor" json:"processor"`
	Memory       string `gorm:"column:memory" json:"memory"`
	Storage      string `gorm:"column:storage" json:"storage"`
	Weight       string `gorm:"column:weight" json:"weight"`
	Power        string `gorm:"column:power" json:"power"`
	Price        string `gorm:"column:price" json:"price"`
	ImageURL     string `gorm:"column:image_url" json:"image_url"`
	ModelURL     string `gorm:"column:model_url" json:"model_url"`
	Featured     bool   `gorm:"column:featured" json:"featured"`
}

type Category struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
}

type Era struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Name        string `json:"name"`
	StartYear   int    `json:"start_year"`
	EndYear     int    `json:"end_year"`
	Description string `json:"description"`
}
