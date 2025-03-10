document.getElementById("fetch-button").addEventListener("click", fetchCountryInfo);

async function fetchCountryInfo() {
    const countryName = document.getElementById("country-input").value.trim();
    if (!countryName) {
        alert("Please enter a country name.");
        return;
    }

    const countryInfoSection = document.getElementById("country-info");
    const borderCountriesSection = document.getElementById("bordering-countries");
    
   
    countryInfoSection.style.display = "none";
    borderCountriesSection.style.display = "none";
    
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) {
            throw new Error("Country not found");
        }
        
        const data = await response.json();
        const country = data[0];

        
        document.getElementById("capital").textContent = country.capital ? country.capital[0] : "N/A";
        document.getElementById("population").textContent = country.population.toLocaleString();
        document.getElementById("region").textContent = country.region;
        document.getElementById("flag").src = country.flags?.png || country.flags?.svg || "";

        countryInfoSection.style.display = "block";

        
        if (country.borders && country.borders.length > 0) {
            const borderList = document.getElementById("border-list");
            borderList.innerHTML = ""; 

            for (let border of country.borders) {
                const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
                const borderData = await borderResponse.json();
                const borderCountry = borderData[0];

                const li = document.createElement("li");
                const flag = document.createElement("img");
                flag.src = borderCountry.flags?.png || borderCountry.flags?.svg || "";
                flag.width = 45;
                flag.height = 45;

                const countryName = document.createElement("span");
                countryName.textContent = borderCountry.name.common;
                
                li.appendChild(flag);
                li.appendChild(countryName);
                borderList.appendChild(li);
            }

            borderCountriesSection.style.display = "block";
        } else {
            borderCountriesSection.style.display = "none";
        }
    } catch (error) {
        alert("Error fetching data: " + error.message);
    }
}
