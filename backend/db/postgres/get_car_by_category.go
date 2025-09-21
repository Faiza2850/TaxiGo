package postgres

import (
	"database/sql"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (db *AiportTaxiDBImpl) GetCarByCategoryDB(carCategory string) (*models.Car, error) {
    query := `
        SELECT id, mileage_price, available, car_category, image, metadata, created_at
        FROM public.cars
        WHERE car_category = $1
    `
    
    var car models.Car
    
    err := db.dbConn.QueryRow(query, carCategory).Scan(
        &car.Id,
        &car.MileagePrice,
        &car.Available,
        &car.CarCategory, 
        &car.Image,      
        &car.MetaData,   
        &car.CreatedAt,
    )
    
    if err != nil {
        if err == sql.ErrNoRows {
            return nil, nil 
        }
        return nil, err 
    }
    
    return &car, nil
}


