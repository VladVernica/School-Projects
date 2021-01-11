function temaJS01 (a,b) {
    document.getElementById('t1a').value=0;
    document.getElementById('t1b').value=0;
    if (a==b) { alert('True'); return true; }
    else { alert('False'); return false; }
}



function temaJS02 (a,b) {
    document.getElementById('t2a').value=0;
    document.getElementById('t2b').value=0;
    if (a<b) { alert('-1'); return -1; }
    else {
        if (a==b) { alert('0'); return 0; }
        else { alert('1'); return 1; }
    }
}



function temaJS03 (a,b) {
    document.getElementById('t3a').value=0;
    document.getElementById('t3b').value=0;
    if (a>b) { alert(a); return a; }
    else { alert(b); return b; }
    
}



function temaJS04 (a,b) {
    document.getElementById('t4a').value=0;
    document.getElementById('t4b').value=0;
    if (a<b) { alert(a); return a; }
    else { alert(b); return b; }
}



function temaJS05 (n) {
    document.getElementById('t5n').value=0;
    var sum=0;
    for (var i=0; i<n; ++i) { sum+=i; }
    alert(sum); return sum;
}



function temaJS06 (n) {
    document.getElementById('t6n').value=0;
    for (var i=2; i<n; i++) {
        if (n%i==0) { alert('False'); return false; }
    }
    alert('True'); return true;
}



function temaJS07 (n) {
    document.getElementById('t7n').value=0;
    if (n==1) { alert(1); return 1; }
    if (n==2) { alert(3); return 3; }
    if (n==3) { alert(6); return 6; }
    var sum=6;
    var number=4;
    var count=3;
    while (count<n) {
        var prim=0;
        for (var i=2; i<number; ++i) {
            if (number%i==0) { prim+=1; }
        }
        if (prim==0) {
            count+=1;
            sum+=number;
        }
        number+=1;
    }
    alert(sum); return sum;
}



function temaJS08 (str) {
    document.getElementById('t8str').value="";
    var splitStr=str.split("");
    var j=str.length-1;
    for (var i=0; i<str.length/2; ++i) {
        var sw=splitStr[i];
        splitStr[i]=splitStr[j-i];
        splitStr[j-i]=sw;
    }
    var reverseStr = splitStr.join("");
    alert(reverseStr); return reverseStr;
}



function temaJS09 (n) {
    document.getElementById('t9n').value=0;
    var count=0;
    var number=1;
    var prod=1;
    while (count<n) {
        prod=prod*number;
        number+=2;
        count+=1;
    }
    alert(prod); return prod;
}



function temaJS10 (arr,x) {
    document.getElementById('t10arr').value="";
    document.getElementById('t10x').value=0;
    var splitArr=arr.split(" ");
    for (var i=0; i<splitArr.length; ++i) {
        if (splitArr[i]==x) { alert("True"); return true; }
    }
    alert("False"); return false;
}



function temaJS11 (arr) {
    document.getElementById('t11arr').value="";
    var splitArr=arr.split(" ");
    var max=splitArr[0];
    for (var i=0; i<splitArr.length; ++i) {
        if (splitArr[i]>max) { max=splitArr[i]; }
    }
    alert(max); return max;
}



function temaJS12 (arr) {
    document.getElementById('t12arr').value="";
    var splitArr=arr.split(" ");
    var max=parseInt(splitArr[0]);
    var min=parseInt(splitArr[0]);
    for (var i=0; i<splitArr.length; ++i) {
        if (parseInt(splitArr[i])>max) { max=parseInt(splitArr[i]); }
        if (parseInt(splitArr[i])<min) { min=parseInt(splitArr[i]); }
    }
    alert(max+min); return max+min;
}



function temaJS13 (arr) {
    document.getElementById('t13arr').value="";
    var splitArr=arr.split(" ");
    for (var i=0; i<splitArr.length; ++i) {
        for (var j=i+1; j<splitArr.length; ++j) {
            if (splitArr[i]==splitArr[j]) { alert("True"); return true; }
        }
    }
    alert("False"); return false;
}



function temaJS14 (arr) {
    document.getElementById('t14arr').value="";
    var prod=1;
    var splitArr=arr.split(" ");
    for (var i=0; i<splitArr.length; ++i) {
        if (parseInt(splitArr[i])>=0) { prod=prod*parseInt(splitArr[i]); }
    }
    alert(prod); return prod;
}



function temaJS15 (str) {
    var splitStr=str.split("");
    for (var i=0; i<splitStr.length/2; ++i) {
        var sw=splitStr[i];
        splitStr[i]=splitStr[splitStr.length-1-i];
        splitStr[splitStr.length-1-i]=sw;
    }
    if (splitStr.join("")==str) { alert("True"); return true; }
    else { alert("False"); return false; }
}