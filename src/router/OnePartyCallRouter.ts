import {DataBase} from "../util/db"
class OnePartyCallRouter
{
    
    private options;
    private http;
    private request;
    private response;
    private participantAddress;
    private ip;
    private db;
       /**
        * CallControll_Handler
        */
        getDb()
        {
            return this.db;

        }
        getOptions()
        {
            return this.options;

        }
        getHttp()
        {
            return this.http;

        }
        getRequest()
        {
            return this.request;

        }getResponse()
        {
            return this.response;

        }getIp()
        {
            return this.ip;
        }
        setDb(db)
        {
            this.db = db;

        }
        setRequest(request)
        {
            this.request = request;

        }
        setResponse(response)
        {
            this.response = response;

        }setParticipantAddress(participantAddress)
        {
         //       console.log("phone====>"+phone);
                this.participantAddress = participantAddress;
        }setHttp(http)
        {
            this.http = http;

        }

     
constructor(host,user,passwd,database,options,http,request,response,participantAddress)
{
    this.db = new DataBase(host,user,passwd,database);
    this.options = options;
    this.http = http;
    this.request = request;
    this.response = response;
    this.participantAddress = participantAddress;
} 

async  OnePartyCall_Handler() {
    
    let pos = await getUserPos(this.db.getConnection(),this.participantAddress);
    let ip = await getUserIp(this.db.getConnection(),pos);
    this.options["host"]=ip;
    this.options["path"]="/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd="+this.participantAddress;
    var real_req = this.http.request(this.options,(real_res)=>{
    real_res.pipe(this.response);
    this.response.write("<br/>（外呼一方类API调用）hello,this is from "+pos+",and it's owner is "+this.participantAddress);
                                                   });
    this.request.pipe(real_req);
}


}
var getUserPos = function(connection,participantAddress){
    
            return new Promise(
                (resolve,reject)=>{
                    // console.log("userpos==>"+connection);
                     connection.query("select * from router where src = "+"'"+participantAddress+"'",function(err,results,fields){
                        if(err)reject(err);
                        else resolve(results[0]["des"]);
                    });
    
                }
    
    
            );
    
        }
        var getUserIp = function(connection,pos){
            
                    return new Promise(
                        (resolve,reject)=>{
                      //      console.log("userip==>");
                            connection.query("select * from city_ip where city = "+"'"+pos+"'",function(err,results,fields){
                                if(err)reject(err);
                                else resolve(results[0]["ip"]);
                            });
            
                        }
            
            
                    );
            
                }

export{OnePartyCallRouter};
