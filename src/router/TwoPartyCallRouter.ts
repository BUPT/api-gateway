import {DataBase} from "../util/db"
class TwoPartyCallRouter
{
    
    private options;
    private http;
    private request;
    private response;
    private caller;
    private callee;
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

        }setCaller(caller)
        {
         //       console.log("phone====>"+phone);
                this.caller = caller;
        }setCallee(callee)
        {
         //       console.log("phone====>"+phone);
                this.callee = callee;
        }setHttp(http)
        {
            this.http = http;

        }

     
constructor(host,user,passwd,database,options,http,request,response,caller,callee)
{
    this.db = new DataBase(host,user,passwd,database);
    this.options = options;
    this.http = http;
    this.request = request;
    this.response = response;
    this.caller = caller;
    this.callee = callee;
} 

async  TwoPartyCall_Handler() {
    
    let posCaller = await getUserPos(this.db.getConnection(),this.caller);
    let ipCaller = await getUserIp(this.db.getConnection(),posCaller);

    let posCallee = await getUserPos(this.db.getConnection(),this.callee);
    let ipCallee = await getUserIp(this.db.getConnection(),posCallee);

    this.options["host"]=ipCaller;
    this.options["path"]="/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd="+this.caller;
    var real_req = this.http.request(this.options,(real_res)=>{
    real_res.pipe(this.response);
    this.response.write("<br/>（外呼两方类API调用）由"+posCallee+"("+ipCallee+")"+"发往"+posCaller+"("+ipCaller+")");
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

export{TwoPartyCallRouter};
