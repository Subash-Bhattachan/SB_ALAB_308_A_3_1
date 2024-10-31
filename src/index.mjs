// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.mjs";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3 
  };
  let isTrue = true;
  // id++;
  // return {id};
  
  try{
    
    if (id < 1 || id > 10 || typeof id !== "number") {
      throw new Error('Invalid ID');

      
     
    }
  // accessing the three databases in the following ways
        const dbPicker = await central(id);
        const userBasicData = dbs[dbPicker](id); // this can circumvent the conditional logic to choose between three databases 
        const userPersonalData = vault(id);

        // this will wait for both promises to resolve
        const [userBasicDetails, userPersonalDetails] = await Promise.all([userBasicData, userPersonalData]);
       
        // adding 50ms delay
        await new Promise(resolve => setTimeout(resolve, 50)); 
        
        return {
            id: id,
            name: userPersonalDetails.name,
            username: userBasicDetails.username,
            email: userPersonalDetails.email,
            address: userPersonalDetails.address,
            phone: userPersonalDetails.phone,
            website: userBasicDetails.website,
            company: userBasicDetails.company,
        };
      } catch (error) {
        return Promise.reject(`There was an error retrieving user data for ID ${id}: ${error.message}`);
      }
      }


// testing the code (1 - 10)
console.log(await getUserData(1));
console.log(await getUserData(5));
console.log(await getUserData(10));

// testing the invalid numbers
console.log(await getUserData(-1));
console.log(await getUserData(11));

// testing the invalid data types
console.log(await getUserData("try"));
console.log(await getUserData(isTrue));



