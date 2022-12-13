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
            const query = await connection.query(`
                SELECT 
                    *
                FROM
                    games;`);
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
    async addCustomers(name, phone, cpf, birthday)
    {
        try 
        {
            await connection.query(`
                INSERT INTO customers
                    (name, phone, cpf, birthday)
                VALUE
                    ($1, $2, $3, $4);`, [name, phone, cpf, birthday]);
            return true;
        }
        catch (err) 
        {
            console.error(err);
            return false;
        } 
    }
    async updateCustomers(name, phone, cpf, birthday)
    {
        try 
        {
            await connection.query(`
                UPDATE 
                    customers
                SET
                    name = $1, 
                    phone = $2, 
                    cpf = $3, 
                    birthday = $4
                WHERE
                    ($1, $2, $3, $4);`, [name, phone, cpf, birthday]);
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
            const query = await connection.query(`
                SELECT 
                    r.id, r.customer_id, r.game_id, r.rent_date, r.days_rented, r.return_date, r.original_price, r.delay_fee,
                    customer.id, customer.name,
                    game.id, game.name, game.category_id, game.category_name
                FROM
                    rentals AS r
                JOIN
                    customers AS customer
                    ON rentals.customer_id = customers.id
                JOIN
                    games AS game
                    ON rentals.game_id = games.id;`);
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
            gamePrice = await connection.query(`SELECT pricePerDay FROM games WHERE id=$1;`, [gameId]).rows[0].pricePerDay,
            originalPrice = gamePrice * daysRented;

        try 
        {
            await connection.query(`
                INSERT INTO rentals
                    (customer_id, game_id, days_rented, rent_date, original_price, days_rented)
                VALUES
                    ($1, $2, $3, $4, $5, $6);`, [customerId, gameId, daysRented, rentDate, originalPrice]);
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
            returnDate = new Date().toLocaleDateString("pt-BR"),
            rentDate = await connection.query(`SELECT rent_date FROM rentals WHERE id=$1`, [1]).rows[0].rentDate, 
            delayFee = returnDate - rentDate;
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