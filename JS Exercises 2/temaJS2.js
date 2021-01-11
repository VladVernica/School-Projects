function temaJS201 (str) {
    var result=document.getElementById('result01');
    var cifre="";
    for (var i=0; i<str.length; ++i) {
        if(str[i]==parseInt(str[i])) {
            cifre+=str[i];
        }
    }
    result.innerHTML=cifre;
}

function temaJS201clear () {
    document.getElementById('h01-input1').value="";
    document.getElementById('result01').innerHTML="result";
}



function temaJS202 (str) {
    var result=document.getElementById('result02');
    var litere="";
    for (var i=0; i<str.length; ++i) {
        if(str[i]!=parseInt(str[i])) {
            litere+=str[i];
        }
    }
    result.innerHTML=litere;
}

function temaJS202clear () {
    document.getElementById('h02-input1').value="";
    document.getElementById('result02').innerHTML="result";
}



function temaJS203 (str) {
    var result=document.getElementById('result03');
    var litere="";
    var count=0;
    var i=0;
    while ((count<5) && (i<str.length)) {
        if(str[i]!=parseInt(str[i])) {
            litere+=str[i];
            ++count;
        }
        ++i;
    }
    result.innerHTML=litere;
}

function temaJS203clear () {
    document.getElementById('h03-input1').value="";
    document.getElementById('result03').innerHTML="result";
}



function temaJS204 (arrstr) {
    var result=document.getElementById('result04');
    var concat="";
    var arr=arrstr.split(" ");
    for (var i=0; i<arr.length; ++i) {
        concat+=arr[i];
    }
    result.innerHTML=concat;
}

function temaJS204clear () {
    document.getElementById('h04-input1').value="";
    document.getElementById('result04').innerHTML="result";
}



function temaJS205 (arrstr) {
    var result=document.getElementById('result05');
    var cifre="";
    var arr=arrstr.split(" ");
    for (var i=0; i<arr.length; ++i) {
        for (var j=0; j<arr[i].length; ++j) {
            if (arr[i][j]==parseInt(arr[i][j])) {
                cifre+=arr[i][j];
            }
        }
    }
    result.innerHTML=cifre;
}

function temaJS205clear () {
    document.getElementById('h05-input1').value="";
    document.getElementById('result05').innerHTML="result";
}



function temaJS206 (arrstr) {
    var result=document.getElementById('result06');
    var arr=arrstr.split(" ");
    resultArr="";
    for (var i=0; i<arr.length; ++i) {
        var invers="";
        for (var j=arr[i].length-1; j>=0; --j) {
            invers+=arr[i][j];
        }
        resultArr+=invers+" ";
    }
    result.innerHTML=resultArr.substring(0,resultArr.length-1);
}

function temaJS206clear () {
    document.getElementById('h06-input1').value="";
    document.getElementById('result06').innerHTML="result";
}



function temaJS207 (nr) {
    var result=document.getElementById('result07');
    var fact=1;
    if (nr==0) { return 0; }
    else {
        for (var i=1; i<=nr; i++) {
            fact*=i;
        }
    }
    result.innerHTML=fact;
}

function temaJS207clear () {
    document.getElementById('h07-input1').value="";
    document.getElementById('result07').innerHTML="result";
}



function temaJS208 (a, b) {
    var result=document.getElementById('result08');
    var div=0;
    var min=a;
    if (b<a) { min=b; }
    for (var i=2; i<=min; ++i) {
        if ((a%i==0)&&(b%i==0)) {
            div=i;
        }
    }
    result.innerHTML=div;
}

function temaJS208clear () {
    document.getElementById('h08-input1').value="";
    document.getElementById('h08-input2').value="";
    document.getElementById('result08').innerHTML="result";
}



function temaJS209 (a, b) {
    var result=document.getElementById('result09');
    var mult=a;
    if (b>a) { mult=b; }
    while ((mult%a!=0)||(mult%b!=0)) {
        ++mult;
    }
    result.innerHTML=mult;
}

function temaJS209clear () {
    document.getElementById('h09-input1').value="";
    document.getElementById('h09-input2').value="";
    document.getElementById('result09').innerHTML="result";
}



function temaJS210 (nr) {
    var result=document.getElementById('result10');
    var divizori=[];
    for (var i=2; i<=parseInt(nr/2); ++i) {
        if (nr%i==0) {
            divizori.push(i);
        }
    }
    result.innerHTML=divizori;
}

function temaJS210clear () {
    document.getElementById('h10-input1').value="";
    document.getElementById('result10').innerHTML="result";
}



function temaJS211 (nr) {
    var result=document.getElementById('result11');
    var x=nr;
    var invers=0;
    while (x!=0) {
        invers=invers*10+x%10;
        x=parseInt(x/10);
    }
    if (nr==invers) { result.innerHTML="Numar palindrom!"; }
    else { result.innerHTML="Numarul nu este palindrom."; }
}

function temaJS211clear () {
    document.getElementById('h11-input1').value="";
    document.getElementById('result11').innerHTML="result";
}



function temaJS212 (arrStr) {
    var arr=arrStr.split(" ");
    for(var j=0; j<arr.length; ++j) arr[j]=parseInt(arr[j]);
    var result=document.getElementById('result12');
    for (var i=0; i<arr.length-1; ++i) {
        if (arr[i]%2==0) {
            for (var j=i+1; j<arr.length; ++j) {
                if ((arr[i]>arr[j])&&(arr[j]%2==0)) {
                    var sw=arr[i];
                    arr[i]=arr[j];
                    arr[j]=sw;
                }
            }
        }
    }
    result.innerHTML=arr;
}

function temaJS212clear () {
    document.getElementById('h12-input1').value="";
    document.getElementById('result12').innerHTML="result";
}



function temaJS213 (arrStr) {
    var arr=arrStr.split(" ");
    for(var j=0; j<arr.length; ++j) arr[j]=parseInt(arr[j]);
    var result=document.getElementById('result13');
    for (var i=0; i<arr.length-1; ++i) {
        if (arr[i]%2==0) {
            for (var j=i+1; j<arr.length; ++j) {
                if ((arr[i]>arr[j])&&(arr[j]%2==0)) {
                    var sw=arr[i];
                    arr[i]=arr[j];
                    arr[j]=sw;
                }
            }
        }
        else {
            for (var j=i+1; j<arr.length; ++j) {
                if ((arr[i]<arr[j])&&(arr[j]%2!=0)) {
                    var sw=arr[i];
                    arr[i]=arr[j];
                    arr[j]=sw;
                }
            }
        }
    }
    result.innerHTML=arr;
}

function temaJS213clear () {
    document.getElementById('h13-input1').value="";
    document.getElementById('result13').innerHTML="result";
}



function trans(arrStr) {
    var arr=arrStr.split(" ");
    for(var j=0; j<arr.length; ++j) arr[j]=parseInt(arr[j]);
    for(var i=0; i<arr.length-1; ++i) {
        for(var h=i+1; h<arr.length; ++h) {
            if(arr[i]>arr[h]) {
                var sw=arr[i];
                arr[i]=arr[h];
                arr[h]=sw;
            }
        }
    }
    return arr;
}



function temaJS214 (arr,nr) {
    var len=arr.length;
    var jum1=arr.slice(0,parseInt(len/2));
    var jum2=arr.slice(parseInt(len/2),len);
    if (jum2[0]==nr) {
        document.getElementById('result14').innerHTML="Numărul se găsește în array."; return;
    }
    else if(len>1) {
        if (nr>jum2[0]) {
            return temaJS214(jum2,nr);
        }
        else {
            return temaJS214(jum1,nr);
        }
    }
    document.getElementById('result14').innerHTML="Numărul nu se găsește în array."; return;
}

function temaJS214clear () {
    document.getElementById('h14-input1').value="";
    document.getElementById('h14-input2').value="";
    document.getElementById('result14').innerHTML="result";
}



var exec=0;
function temaJS215 (arr,nr) {
    ++exec;
    let len=arr.length;
    let jum1=arr.slice(0,parseInt(len/2));
    let jum2=arr.slice(parseInt(len/2),len);
    if (jum2[0]==nr) {
        let x=exec;
        exec=0;
        document.getElementById('result15').innerHTML="Numarul "+nr+" a fost gasit in array, iar functia s-a executat de "+x+" ori"; return;
    }
    else if(len>1) {
        if (nr>jum2[0]) {
            return temaJS215(jum2,nr);
        }
        else {
            return temaJS215(jum1,nr);
        }
    }
    let x=exec;
    exec=0;
    document.getElementById('result15').innerHTML="Numarul "+nr+" nu a fost gasit in array, iar functia s-a executat de "+x+" ori"; return;
}

function temaJS215clear () {
    document.getElementById('h15-input1').value="";
    document.getElementById('h15-input2').value="";
    document.getElementById('result15').innerHTML="result";
}