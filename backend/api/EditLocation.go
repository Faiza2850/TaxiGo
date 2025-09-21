package api
import (
	"fmt"
	"github.com/CapregSoft/project-airport-taxi/models"
)
func (api *AiportTaxiAPIImpl) EditLocation(location *models.Location) ( error){
	err := api.postgres.EditLocationDb(location)
	fmt.Println("data",err)
	if err != nil {
		return err
	}
	return  nil
}