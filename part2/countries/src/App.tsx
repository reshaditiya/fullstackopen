/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react"
import axios from "axios"

function App() {
	const [keyword, setKeyword] = useState("")
	const allCountries = useRef([])
	const [weather, setWeather] = useState({})
	const [filteredCountries, setFilteredCountries] = useState([])

	useEffect(() => {
		axios
			.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((response) => (allCountries.current = response.data))
			.catch((error) => console.log(error))
	}, [])
	useEffect(() => {
		if (keyword) {
			setFilteredCountries(
				allCountries.current.filter((country) =>
					country.name.common.match(new RegExp(keyword, "gi"))
				)
			)
		}
	}, [keyword])
	useEffect(() => {
		if (filteredCountries.length === 1) {
			axios
				.get(
					`https://api.open-meteo.com/v1/forecast?latitude=${filteredCountries[0].capitalInfo.latlng[0]}&longitude=${filteredCountries[0].capitalInfo.latlng[1]}&hourly=temperature_2m&current_weather=true&forecast_days=1`
				)
				.then((response) => setWeather(response.data))
				.catch((error) => console.log(error))
		} else setWeather({})
	}, [filteredCountries])

	return (
		<>
			<FilterData keyword={keyword} setKeyword={setKeyword} />
			<DataDisplay
				filteredCountries={filteredCountries}
				setKeyword={setKeyword}
				weather={weather}
			/>
		</>
	)
}

export default App

function FilterData({
	keyword,
	setKeyword,
}: {
	keyword: string
	setKeyword: Function
}) {
	return (
		<label>
			find countries
			<input
				type="text"
				value={keyword}
				onChange={(e) =>
					setKeyword(
						e.target.value.replace(new RegExp("[^a-z]", "gi"), "")
					)
				}
			/>
		</label>
	)
}

function DataDisplay({
	filteredCountries,
	setKeyword,
	weather,
}: {
	filteredCountries: Object[]
	setKeyword: Function
	weather: Object
}) {
	return (
		<div>
			{filteredCountries.length < 10 ? (
				filteredCountries.length === 1 ? (
					<div>
						<h1>{filteredCountries[0].name.common}</h1>
						<p>{filteredCountries[0].capital[0]}</p>
						<p>area {filteredCountries[0].area}</p>

						<h2>languages</h2>
						<ul>
							{Object.keys(filteredCountries[0].languages).map(
								(key) => (
									<li key={key}>
										{filteredCountries[0].languages[key]}
									</li>
								)
							)}
						</ul>
						<img
							src={filteredCountries[0].flags.svg}
							alt={filteredCountries[0].flags.alt}
							style={{
								height: "150px",
							}}
						></img>
						<h2>Weather in {filteredCountries[0].capital[0]}</h2>
						<p>
							temperature{" "}
							{Object.keys(weather).length > 0
								? weather.current_weather.temperature
								: 0}{" "}
							Celcius
						</p>
						<p>
							Wind{" "}
							{Object.keys(weather).length > 0
								? weather.current_weather.windspeed
								: 0}{" "}
							m/s
						</p>
					</div>
				) : (
					<ul>
						{filteredCountries.map((country) => (
							<li key={country.name.common}>
								{country.name.common}
								<button
									onClick={() =>
										setKeyword(country.name.common)
									}
								>
									show
								</button>
							</li>
						))}
					</ul>
				)
			) : (
				<p>Too many matches, specify another filter</p>
			)}
		</div>
	)
}
