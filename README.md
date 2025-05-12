# DT207G - Moment 3, del 2.2
## Av Caroline Jungefalk

Detta är en frontendapplikation för en labb i kursen backend-baserad webbutveckling.  
Syftet med labben är att förstå hur man kan bygga en webbtjänst med en NoSQL-databas, i detta fallet MongoDB, och hur man använder sig av CRUD-operationer för att hämta, lägga till, uppdatera och ta bort data från databsen.

### Länk till API
[https://dt207g-moment3-1.onrender.com/work_experience](https://dt207g-moment3-1.onrender.com/work_experience)

### Om sidan

Syftet med webbplatsen är att kunna lagra arbetserfarenheter i ett CV. Applikationen är byggd med npm och parcel och gör anrop till en webbtjänst som använder MongoDB Atlas som molndatabas. 

#### Funktioner:

- När Applikationen startas görs ett GET-anrop mot API:et. De befintliga dokumenten i databasen läses då ut till skärmen.
- Användaren kan lägga till arbetserfarenheter via ett formulär. Ett POST-anrop görs mot databasen lägger till den nya posten. Om formuläret inte skulle vara korrekt ifyllt får användare ett felmeddelande och annars en bekräftelse på att posten är tillagd till CV:t.
- Det går att ta bort poster från databasen genom att trycka på "Ta bort" - knappen. Postens id skickas till ett DELETE-anrop och tar bort den aktuella posten.