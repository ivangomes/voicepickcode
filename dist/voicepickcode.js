


	function CreateCrc16(){
        var polynomial,value,temp;
        var table=new Array(256);
        
            polynomial=40961;
        for(i=0;i<table.length;++i){
            value=0;temp=i;
        for(j=0;j<8;++j){if(0!=((value^temp)&1)){
            value=(value>>1)^polynomial
        }else{
            value>>=1
        }
            temp>>=1
        }
            table[i]=value
        }return table
    }
    
    var crc,table,GTINLotString,index;


    var GTIN = "10850510002011";
    var Lot = "46587443HG234"
    var date = "180616" //YYMMDD
    GTINLotString = GTIN+Lot+date;
    
    
    
    crc=0;
    table=CreateCrc16();
    
    for(i=0;i<GTINLotString.length;++i){
        index=(crc^GTINLotString.charCodeAt(i))%256;
        crc=(crc>>8)^table[index]
    }
    
    var VoiceCode=(crc%10000)+"";
    var length=VoiceCode.length;
    for(i=VoiceCode.length;i<4;i++)
    {
        VoiceCode="0"+VoiceCode
    }


    console.log("Plain Text = " +GTINLotString);
    console.log("Voice = " + VoiceCode);
    console.log("Small Digits = " + VoiceCode.substr(0,2));
    console.log("Large Digits = " + VoiceCode.substr(2,2));
  
  
