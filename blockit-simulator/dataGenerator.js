// time is not yet a factor as this is processed in queue
// t = time in hours
// ct= consumption time 
// pt= production time
// xt= threshold before energy elec depletion
// n = number of data points (do-able)
// rc= rate of consumption (elec/ct) (done)
// rp= rate of production  (elec/pt) (done)

var listingId = 1;


const util               = require('./util');

var user = util.getProfiles();

var main = function ()
{
    user.forEach(num => 
        {
            setImmediate(() => 
            {
                util.addProsumerInstance('prosumer',num.prosumerId,num.name,num.balance,num.electricityId);
            });
            setImmediate(() => 
            {
                util.addElectricityInstance('electricity',num.prosumerId,num.electricityId,num.electricityamount);
            });
        });


    user.forEach(num => 
        {
            setImmediate(() => 
            {
                while (num.electricityamount<=100) 
                {
                    num.electricityamount+=num.productionRate;
                    util.addMeterInstance('produce',num.prosumerId,num.electricityamount);
                }
            });
            setImmediate(() => 
            {
                while (num.electricityamount>=20) 
                {
                    num.electricityamount-=num.consumptionRate;
                    util.addMeterInstance('consume',num.prosumerId,num.electricityamount);
                }
            });
            setImmediate(() => 
            {
                data = util.getProfileById(num.prosumerId);     
                util.addListingInstance('listing',listingId, data.electricityId,data.reservePrice,data.description);
                
            });  
            setImmediate(() => 
            {
                subUser = [num.prosumerId];
                var usersOffering = user.filter((use)=> use.prosumerId !== num.prosumerId);
                usersOffering.forEach(numx => 
                    {    
                    data = util.getProfileById(numx.prosumerId);  
                    util.addOfferInstance('offer',data.prosumerId, listingId ,data.maxBid);
                    })              
            });
            
            setImmediate(() => 
            {
                util.addCloseInstance('close',num.prosumerId);
                listingId=listingId+1;
            });       
            
        });
}

main();