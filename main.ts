import*as f from'fs';
let{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env,T="04419:>?0000000066666665666566666660000000000000011000000000000052000000000000001141",A=(a,b,i)=>[a+b|0,a-b|0,Math.imul(a,b),a/b|0,a%b|0,(a>>>0)/(b>>>0)|0,(a>>>0)%(b>>>0)|0,-a|0,a&b,a|b,a^b,~a,a<<b,a>>b,a>>>b|0,0,a==b|0,a<b|0,a>>>0<b>>>0|0][i],F=f.readFileSync,W=f.writeFileSync,Q=
(p,i,d=[],c=[],m=[],o=[],s=0,k=0,l=0,q=0,r=0,t=0,v,u,w,z,b)=>{try{while(t<1e6){
v=p[r],u=v<3?v*v:(v^48)<4?2:0;
if(r<0|r+u>=p.length)throw 9
t++,r+=++u;
w=T.charCodeAt(v),z=w&3;
if(s<z)throw 2
if(s-z+(w>>2&3)>256)throw 3
if((v-16>>>0)<19){if(!d[s-1]&v>18&v<23)throw 4
d[s-z]=A(d[s-z],d[s-1],v-16);
s-=z-1}else if((v^48)<3){if(v<49||(v-49?d[--s]:!d[--s]))r+=p.readInt16LE(r-2)}else switch(v){
case 0:case 83:throw v?d[--s]&255:0
case 1:case 2:case 82:d[s++]=v<2?p[r-1]<<24>>24:v<3?p.readInt32LE(r-4):i[q++]??-1;break
case 3:s--;break
case 4:case 6:d[s]=d[s++-1-(v>4)];break
case 5:[d[s-1],d[s-2]]=[d[s-2],d[s-1]];break
case 7:[d[s-3],d[s-2],d[s-1]]=[d[s-2],d[s-1],d[s-3]];break
case 51:if(k>=64)throw 7
c[k++]=r;r=p[r-2]|p[r-1]<<8;break
case 52:if(!k)throw 8
r=c[--k];break
case 64:case 65:if(d[s-1]>>8)throw 6
v<65?d[s-1]=m[d[s-1]]|0:(m[d[s-1]]=d[s-2],s-=2);break
case 80:case 81:b=v&1?[d[--s]&255]:Buffer.from(''+d[--s]);if(l+b.length>2**16)throw 11
for(z of b)o[l++]=z;break
default:throw 5}}throw 10}catch(e){return[Buffer.from(o.slice(0,l)),e]}};f.readdirSync(I).map(v=>{let z=I+'/'+v,y=O+'/'+v,r=Q(F(z+'/program.bin'),F(z+'/input.bin'))
f.mkdirSync(y,{recursive:!0}),W(y+'/stdout.bin',r[0]),W(y+'/exit.txt',r[1]+'\n')})