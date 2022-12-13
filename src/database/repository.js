import connection from "./database.js";

class Repository 
{
    async addCategory(name)
    {
        try 
        {
            await connection.query(`
                INSERT INTO 
                    categories (name)
                VALUES
                    ($1);`, [name]);
            return true;
        }
        catch (err) 
        {
            console.error(err);
            return false;
        }
    }
    async getCategories()
    {
        try 
        {
            const query = await connection.query(`
                SELECT 
                    *
                FROM
                    categories;`);
            return query.rows;
        }
        catch (err) 
        {
            console.error(err);
            return false;
        }
    }
    async addGame(name, image, stockTotal, categoryId, pricePerDay)
    {

        try 
        {
            const query = await connection.query(`
                INSERT INTO games
                    (name, image, stock_total, category_id, price_per_day)
                VALUES
                    ($1, $2, $3, $4, $5);`, [name, image, stockTotal, categoryId, pricePerDay]);
            return query.rows;
        }
        catch (err) 
        {
            console.error(err);
            return false;
        }
    }
    async getGames()
    {
        try 
        {
            let query = await connection.query(`
                SELECT 
                    games.id,
                    games.name, 
                    games.image, 
                    games.stock_total, 
                    games.category_id, 
                    games.price_per_day,
                    c.name as category_name
                FROM
                    games
                JOIN
                    categories AS c
                ON 
                    games.category_id = c.id;`);

            query = query.rows.map(el => {
                return {
                    id: el.id,
                    name: el.name, 
                    image: el.image, 
                    stockTotal: el.stock_total, 
                    categoryId: el.category_id, 
                    pricePerDay: el.price_per_day,
                    categoryName: el.category_name
                }
            });
            return query;
        }
        catch (err) 
        {
            console.error(err);
            return false;
        }
    }
    async getGameById(id)
    {
        try 
        {
            const query = await connection.query(`
                SELECT 
                    *
                FROM
                    games
                WHERE
                    id=$1;`, [id]);
            return query.rows;
        }
        catch (err) 
        {
            console.error(err);
            return false;
        }
    }
    async getCustomers()
    {
        try 
        {
            const query = await connection.query(`
                SELECT 
                    *
                FROM
                    customers;`);
            return query.rows;
        }
        catch (err) 
        {
            console.error(err);
            return false;
        } 
    }
    async getCustomersById(id)
    {
        try 
        {
            const query = await connection.query(`
                SELECT 
                    *
                FROM
                    customers
                WHERE
                    id=$1;`, [id]);
            return query.rows[0];
        }
        catch (err) 
        {
            console.error(err);
            return false;
        } 
    }
    async addCustomer(name, phone, cpf, birthday)
    {
        const BIRTHDAY = new Date(birthday).toLocaleDateString("pt-BR");
        try 
        {
            await connection.query(`
                INSERT INTO customers
                    (name, phone, cpf, birthday)
                VALUES
                    ($1, $2, $3, $4);`, [name, phone, cpf, BIRTHDAY]);
            return true;
        }
        catch (err) 
        {
            console.error(err);
            return false;
        } 
    }
    async updateCustomer(id, name, phone, cpf, birthday)
    {
        const bd = birthday.split("/");
        const BIRTHDAY = new Date(`${bd[2]}/${bd[1]}/${bd[0]}`);
        try 
        {
            await connection.query(`
                UPDATE 
                    customers
                SET
                    name = $2, 
                    phone = $3, 
                    cpf = $4, 
                    birthday = $5
                WHERE
                    id=$1;`, [id, name, phone, cpf, BIRTHDAY]);
            return true;
        }
        catch (err) 
        {
            console.error(err);
            return false;
        } 
    }
    async getRentals()
    {
        try 
        {
            let query = await connection.query(`
                SELECT 
                    rentals.id AS id, 
                    rentals.customer_id AS customerId, 
                    rentals.game_id AS gameId, 
                    rentals.rent_date AS rentDate, 
                    rentals.days_rented AS daysRented, 
                    rentals.return_date AS returnDate, 
                    rentals.original_price AS originalPrice, 
                    rentals.delay_fee AS delayFee,

                    customer.id AS idCustomer, 
                    customer.name AS nameCustomer,
                    
                    game.id AS idGame, 
                    game.name AS gameName, 
                    game.category_id AS gameIdCategory, 
                    game.price_per_day AS gamePricePerDay
                FROM
                    rentals
                    JOIN
                        customers AS customer
                        ON rentals.customer_id = customer.id
                    JOIN
                        games AS game
                        ON rentals.game_id = game.id;`);

                        
            query = query.rows.map(el => {
                return {
                    id: el.id,
                    customerId: el.customerid,
                    gameId: el.gameid,
                    rentDate: el.rentdate,
                    daysRented: el.daysrented,
                    returnDate: el.returndate,
                    originalPrice: el.originalprice,
                    delayFee: el.delayfee,

                    customer: {
                        id: el.idcustomer,
                        name: el.namecustomer
                    },
                    game: {
                        id: el.idgame,
                        name: el.gamename,
                        categoryId: el.gameidcategory,
                        categoryName: el.gamepriceperday
                    }
                }
            }); 
            console.log(query);

            return query;
        }
        catch (err) 
        {
            console.error(err);
            return false;
        }
    }
    async getRentalById(id)
    {
        try 
        {
            const query = await connection.query(`
                SELECT 
                    *
                FROM
                    rentals
                WHERE
                    id=$1;`, [id]);
            return query.rows[0];
        }
        catch (err) 
        {
            console.error(err);
            return false;
        }
    }
    async getRentalByGameId(gameId)
    {
        try 
        {
            const query = await connection.query(`
                SELECT 
                    *
                FROM
                    rentals
                WHERE
                    game_id=$1;`, [gameId]);
            return query.rows;
        }
        catch (err) 
        {
            console.error(err);
            return false;
        }
    }
    async getRentalByCustomerId(customerId)
    {
        try 
        {
            const query = await connection.query(`
                SELECT 
                    *
                FROM
                    rentals
                WHERE
                    customer_id=$1;`, [customerId]);
            return query.rows;
        }
        catch (err) 
        {
            console.error(err);
            return false;
        }  
    }
    async addRental(customerId, gameId, daysRented)
    {
        const 
            rentDate = new Date().toLocaleDateString("pt-BR"),
            gamePrice = (await connection.query(`SELECT price_per_day FROM games WHERE id=$1;`, [gameId])).rows[0].price_per_day,
            originalPrice = gamePrice * daysRented;

        try 
        {
            await connection.query(`
                INSERT INTO rentals
                    (customer_id, game_id, days_rented, rent_date, original_price)
                VALUES
                    ($1, $2, $3, $4, $5);`, [customerId, gameId, daysRented, rentDate, originalPrice]);
            return true;
        }
        catch (err) 
        {
            console.error(err);
            return false;
        }
    }
    async finishRental(id)
    {
        const 
            returnDate = new Date(),
            rental = (await connection.query(`SELECT * FROM rentals WHERE id=$1`, [id])).rows[0],
            price_per_day = (await connection.query(`SELECT price_per_day FROM games WHERE id=$1`, [rental.game_id])).rows[0].price_per_day;

        const r_dayCalc = 1000 * 60 * 60 * 24;
        const r_today = new Date().getTime() / r_dayCalc;
        const r_limit = new Date(rental.rent_date).getTime();
            
        let delayFee = null;
        if(r_today > r_limit)
        {
            delayFee = new Date(r_limit - r_today);
            delayFee = parseInt( (delayFee / (1000 * 60 * 60 * 24)) * price_per_day );
        }

        try 
        {
            await connection.query(`
                UPDATE
                    rentals 
                SET
                    return_date = $2,
                    delay_fee = $3
                WHERE
                    id=$1;`, [id, returnDate, delayFee]);
            return true;
        } 
        catch (err) 
        {
            console.error(err);
            return false;
        }
    }
    async deleteRental(id)
    {
        try 
        {
            await connection.query(`
                DELETE FROM
                    rentals
                WHERE
                    id=$1;`, [id]);
            return true;
        } 
        catch (err) 
        {
            console.error(err);
            return false;
        }
    }
}

const repository = new Repository();
export default repository;