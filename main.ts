import*as f from'fs';
let{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env,E=new TextEncoder,T="04419:>?0000000066666665666566666660000000000000011000000000000052000000000000001141",A="a+b|0;a-b|0;Math.imul(a,b);a/b|0;a%b|0;(a>>>0)/(b>>>0)|0;(a>>>0)%(b>>>0)|0;-a|0;a&b;a|b;a^b;~a;a<<(b&31);a>>(b&31);a>>>(b&31)|0;0;+(a===b);+(a<b);+(a>>>0<b>>>0)".split(';').map(e=>Function('a,b','return '+e)),F=f.readFileSync,W=f.writeFileSync;
let Q=(p,i)=>{let d=[],c=[],m=[],o=Buffer.alloc(1<<16),s=0,k=0,l=0,q=0,r=0,t=0;
try{for(;;){if(t===1e6)throw 10;
let v=p[r],u=v<3?v*v:v>47&v<52?2:0;
if(r<0|r+u>=p.length)throw 9;
t++,r+=++u;
let w=T.charCodeAt(v),z=w&3;
if(s<z)throw 2;
if(s-z+(w>>2&3)>256)throw 3;
if(A[v-16]){if(!d[s-1]&v>18&v<23)throw 4;
d[s-z]=A[v-16](d[s-z],d[s-1]);
s-=z-1}else if(v>47&v<51){if(v<49||(v-49?d[--s]:!d[--s]))r+=p.readInt16LE(r-2)}else switch(v){
case 0:case 83:throw v?d[--s]&255:0;
case 1:case 2:case 82:d[s++]=v<2?p[r-1]<<24>>24:v<3?p.readInt32LE(r-4):i[q++]??-1;break;
case 3:s--;break;
case 4:case 6:d[s]=d[s++-1-(v>4)];break;
case 5:[d[s-1],d[s-2]]=[d[s-2],d[s-1]];break;
case 7:[d[s-3],d[s-2],d[s-1]]=[d[s-2],d[s-1],d[s-3]];break;
case 51:if(k>=64)throw 7;c[k++]=r;r=p[r-2]|p[r-1]<<8;break;
case 52:if(!k)throw 8;r=c[--k];break;
case 64:case 65:if(d[s-1]>>8)throw 6;if(v<65)d[s-1]=m[d[s-1]]|0;else m[d[(s-=2)+1]]=d[s];break;
case 80:case 81:let b=v&1?[d[--s]&255]:E.encode(''+d[--s]);if(l+b.length>65536)throw 11;o.set(b,l);l+=b.length;break;
default:throw 5}}}catch(e){return[o.slice(0,l),e]}};f.readdirSync(I).map(v=>{let z=I+'/'+v,y=O+'/'+v,r=Q(F(z+'/program.bin'),F(z+'/input.bin'));
f.mkdirSync(y,{recursive:!0}),W(y+'/stdout.bin',r[0]),W(y+'/exit.txt',r[1]+'\n')})
