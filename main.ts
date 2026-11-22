import{mkdirSync as M,readdirSync as R,readFileSync as F,writeFileSync as W}from'fs';
import{join as J}from'path';
let I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',E=new TextEncoder;
function run(p,i){
let n=p.length,d=new Int32Array(256),s=0,c=new Int32Array(64),k=0,m=new Int32Array(256),o=Buffer.alloc(65536),l=0,q=0,r=0,t=0,x=(e)=>({stdout:o.slice(0,l),exit:e});
for(;;){
if(t===1e6)return x(10);
if(r<0||r>=n)return x(9);
let v=p[r],u=v===1?1:v===2?4:!(v-0x30>>>2)?2:0;
if(r+u>=n)return x(9);t++;r+=u+1;
if(v>=0x10&&v<=0x22&&v^0x17&&v^0x1B){
if(s<2)return x(2);
let b=d[--s],a=d[--s];
if(!b&&!(v-0x13>>>2))return x(4);
d[s++]=v===0x10?a+b|0:v===0x11?a-b|0:v===0x12?Math.imul(a,b):v===0x13?a/b|0:v===0x14?a%b|0:v===0x15?(a>>>0)/(b>>>0)|0:v===0x16?(a>>>0)%(b>>>0)|0:v===0x18?a&b:v===0x19?a|b:v===0x1A?a^b:v===0x1C?a<<(b&31):v===0x1D?a>>(b&31):v===0x1E?a>>>(b&31)|0:v===0x20?a===b?1:0:v===0x21?a<b?1:0:v===0x22?a>>>0<b>>>0?1:0:0;continue
}
switch(v){
case 0x00:return x(0);
case 0x01:if(s>255)return x(3);d[s++]=p[r-1]<<24>>24;break;
case 0x02:if(s>255)return x(3);d[s++]=p[r-4]|p[r-3]<<8|p[r-2]<<16|p[r-1]<<24;break;
case 0x03:if(s<1)return x(2);s--;break;
case 0x04:if(s<1)return x(2);if(s>255)return x(3);d[s]=d[s-1];s++;break;
case 0x05:if(s<2)return x(2);[d[s-1],d[s-2]]=[d[s-2],d[s-1]];break;
case 0x06:if(s<2)return x(2);if(s>255)return x(3);d[s]=d[s-2];s++;break;
case 0x07:if(s<3)return x(2);[d[s-3],d[s-2],d[s-1]]=[d[s-2],d[s-1],d[s-3]];break;
case 0x17:case 0x1B:if(s<1)return x(2);d[s-1]=v===0x17?-d[s-1]|0:~d[s-1];break;
case 0x30:r+=((p[r-2]|p[r-1]<<8)<<16>>16);break;
case 0x31:case 0x32:if(s<1)return x(2);if(v===0x31?!d[--s]:d[--s])r+=((p[r-2]|p[r-1]<<8)<<16>>16);break;
case 0x33:if(k>=64)return x(7);c[k++]=r;r=p[r-2]|p[r-1]<<8;break;
case 0x34:if(k<=0)return x(8);r=c[--k];break;
case 0x40:if(s<1)return x(2);if(d[s-1]>>8)return x(6);d[s-1]=m[d[s-1]];break;
case 0x41:if(s<2)return x(2);if(d[s-1]>>8)return x(6);m[d[(s-=2)+1]]=d[s];break;
case 0x50:if(s<1)return x(2);let b=E.encode(''+d[s-1]);if(l+b.length>65536)return x(11);s--;o.set(b,l);l+=b.length;break;
case 0x51:if(s<1)return x(2);if(l+1>65536)return x(11);o[l++]=d[--s]&255;break;
case 0x52:if(s>255)return x(3);d[s++]=q<i.length?i[q++]:-1;break;
case 0x53:if(s<1)return x(2);return x(d[--s]&255);
default:return x(5)
}
}
}
for(let v of R(I).sort()){let r=run(F(J(I,v,'program.bin')),F(J(I,v,'input.bin')));M(J(O,v),{recursive:!0});W(J(O,v,'stdout.bin'),r.stdout);W(J(O,v,'exit.txt'),r.exit+'\n')}