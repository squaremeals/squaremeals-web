const turbo = require('turbo360')({site_id:process.env.TURBO_APP_ID})
const resource = 'account'

module.exports = {
	mealplan: (height, weight, age, gender, goal, activityLevel, mealsPerDay) => {

		console.log(height, weight, age, gender, goal, activityLevel, mealsPerDay)

		let msj = 0
		// Mifflin St Jeor: Male
		// 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5
		if (gender === 'male') {
			msj = (10*weight) + (6.25*height) - (5*age) + 5
		}

		// Mifflin St Jeor: Female
		// 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) – 161.
		if (gender === 'female') {
			msj = (10*weight) + (6.25*height) - (5*age) - 161
		}

		// Total Daily Energy Expenditure
		let tdee = msj+(333*activityLevel)
		if (goal === 'lose') tdee -= 500
		if (goal === 'gain') tdee += 500

		let calPerMeal = Math.floor(tdee/mealsPerDay);

		console.log('MSJ:   ', msj)
		console.log('TDEE:  ', tdee)
		console.log('CPM:   ', calPerMeal);

		// (((85.28*10)+(6.25*180.34)-(5*22)+5) + (333*3) -500)/3

		return new Promise((resolve, reject) => {
			console.log("CAL PER MEAL: ", calPerMeal)
			turbo.fetch('meals', {})
			.then(data => {
				console.log('MEALS: ', data)
				let mealplan=[]
				let totalCalories=0;
				let totalProtein=0;
				let totalCarbs=0;
				let totalFats=0;

				for (i=0; i<mealsPerDay; i++){
					if (data[i].calories < calPerMeal) {
						mealplan.push(data[i])
						totalCalories+=data[i].calories;
						totalProtein+=data[i].protein;
						totalCarbs+=data[i].carbs;
						totalFats+=data[i].fats;
					}
					if (mealplan.length == mealsPerDay) resolve({ meals: mealplan, msj: msj, tdee: Math.floor(tdee).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), calories: totalCalories, protein: totalProtein, carbs: totalCarbs, fats: totalFats })
				}
			})
			.catch(error => { reject(error) })
		})
	}
}