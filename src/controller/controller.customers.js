import repository from "../database/repository.js";

const controller_customers = {
    listCustomers: async (req, res) => 
    {
        const customers = await repository.getCustomers();
        
        return res.status(200).send(customers);
    },
    findCustomerById: async (req, res) => 
    {
        const { data } = res.locals;

        try 
        {
            const customers = await repository.getCustomersById(data.id);

            if(!customers) throw Error("query error");
               
            return res.status(200).send(customers);
        } 
        catch (err) 
        {
            console.error(err);
            return res.sendStatus(404);

        }
    },
    insertCustomer: async (req, res) => 
    {
        const { data } = res.locals;

        try 
        {
            const query = await repository.addCustomer(data.name, data.phone, data.cpf, data.birthday);

            if(!query) throw Error("query error");

            return res.status(200).send("Customer adicionado.");
        } 
        catch (err) 
        {
            console.error(err);
            return res.sendStatus(404);
        }
    },
    updateCustomer: async(req, res) => 
    {
        const { data } = res.locals;

        try 
        {
            const query = await repository.updateCustomer(data.id, data.name, data.phhone, data.cpf, data.birthday);
            
            if(!query) throw Error("query error");

            return res.status(200).send("Customer atualizado.");
        } 
        catch (err) 
        {
            console.error(err);
            return res.sendStatus(404); 
        }

    }
};

export default controller_customers;