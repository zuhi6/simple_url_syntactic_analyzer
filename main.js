
const { iterateUrl } = require('./simple_url_syntactic_analyzer');

showTable = (trace) => {
    let traceTable = document.getElementById("trace-table");
   
    trace = trace.replace(/\$/g,'$,').split(',').reduce((result, value, index, array) =>{
        if (index % 2 === 0)
          result.push(array.slice(index, index + 2));
        return result;
      }, []);

    trace = [...new Set(trace.map(trace => trace.toString()))].map(distinct => distinct.split(","));
    
    let rows = ''

    trace.forEach(([rule, url]) => {
        if(!url) return;
        rows += `<tr>
                    <td width='184' height='52'>
                    ${rule}
                    </td>
                    <td width='184' height='52'>
                    ${url}
                    </td>                    
                 <tr>`
    })
    traceTable.style.display = "block";
    document.getElementById("trace-tbody").innerHTML = rows;
}

checkUrls = () => {

    let urls = document.getElementById("urls").value.trim().split("|").filter(url => url.length);
    let table = document.getElementById("table")

    document.getElementById("trace-table").style.display = "none";



    const [firstUrl] = urls;

    if (!firstUrl) {
        table.style.display = "none";
        return;
    }

    urls = urls.map(url=> {
        const {trace, result, recover} = iterateUrl(url);
        return { url , result, trace, recover};
    });

    let rows = ''
    
    urls.forEach(url => {
        const color = url.result ? 'lightgreen' : 'red';
        rows += `<tr>
                    <td width='184' height='52'>
                    <mark style="background-color: ${color}">${url.url}<mark>
                    </td>
                    <td width='184' height='52'>
                    ${url.result}
                    </td>
                    <td>
						<input type=button value="Show Trace" onclick="showTable('${url.trace.join('')}')" style="width:100%">
                    </td>
                    <td width='184' height='52'>
                    ${url.recover}
                    </td>
                    
                 <tr>`
    })

    table.style.display = "block";
    document.getElementById("tbody").innerHTML = rows;

}