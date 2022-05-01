jQuery(document).ready(function($){
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
 
        function formatInt(v, pattern) {
            let inp = String(v);
            let out = "";
            for (let i = pattern.length - 1, i2 = inp.length - 1; i >= 0; --i) {
                switch (pattern[i]) {
                    case "0":
                        out = (i2 >= 0 ? inp[i2] : "0") + out;
                        --i2;
                        break;
                    case "9":
                        out = (i2 >= 0 ? inp[i2] : " ") + out;
                        --i2;
                        break;
                    default:
                        out = pattern[i] + out;
                        break;
                }
            }
            return out;
        }
    // Create table
         function createTable(wrapper, caption, headArray, bodyArray, footArray) {
            let s = `<table>`;
            if (typeof caption === "string" && caption.length) {
                s += `<caption>${caption}</caption>`;
            }
            if (Array.isArray(headArray) && headArray.length) {
                s += `<thead><tr>`;
 
                for (let name of headArray)
                    s += `<th>${name}</th>`;
 
                s += `</tr></thead>`;
            }
            s += `<tbody>`;
            for (let row of bodyArray) {
                s += `<tr>`;
                for (let e of Object.values(row))
                    s += `<td>${e}</td>`;
 
                s += `</tr>`;
            }
            s += `</tbody>`;
            if (Array.isArray(footArray) && footArray.length) {
                s += `<tfoot><tr>`;
 
                for (let summary of footArray)
                    s += `<th>${summary}</th>`;
 
                s += `</tr></tfoot>`;
            }
            s += `</table>`;
            wrapper.insertAdjacentHTML("beforeend", s);
        }
 
        class Student {
 
            static _nextId = 1;
 
            constructor(firstname, lastname) {
                this.firstname = firstname;
                this.lastname = lastname;
                this.id = Student.nextId;
                this.averageMark = random(10, 50) / 10;
            }
            static get nextId() { return Student._nextId++; }
        }
 
        let students = [
            new Student("Василь", "Пупкин"),
            new Student("Михайло", "Блогер"),
            new Student("Петро", "Мотиватор"),
            new Student("Петро", "Бампер"),
            new Student("Олександр", "Поворознюк"),
            new Student("Сергій", "Мавроді"),
            new Student("Володимир", "Мессі"),
            new Student("Сашко", "Шапік"),
            new Student("Павло", "Пел"),
            new Student("Дмитро", "Гордон")
        ];
 
        let headArray = ["ID", "Имя", "Фамилия", "Середній\nбал"];
        let bodyArray = students.map(e => [formatInt(e.id, "0000-0000"), e.firstname, e.lastname, e.averageMark.toFixed(1)]);
 
        createTable(document.body, "Список студентів", headArray, bodyArray);
 
        $("table")
    .tablesorter();
});

// Create function FIND text in this page
var input,search,pr,result,result_arr, locale_HTML, result_store;

function func() {
     locale_HTML = document.body.innerHTML;   
}
setTimeout(func, 1000); 

function FindOnPage(name, status) {

    input = document.getElementById(name).value;
    
    if(input.length<3&&status==true)
    {
        alert('Для пошуку введіть більше трьох символів');
        function FindOnPageBack() { document.body.innerHTML = locale_HTML; }
    }
    
    if(input.length>=3)
    {
        function FindOnPageGo() {

            search = '/'+input+'/g';  
            pr = document.body.innerHTML;
            result = pr.match(/>(.*?)</g);  
            result_arr = []; 

            var warning = true;
            for(var i=0;i<result.length;i++) {
                if(result[i].match(eval(search))!=null) {
                    warning = false;
                }
            }
            if(warning == true) {
                alert('Немає співпадіння');
            }

            for(var i=0; i<result.length;i++) {
                result_arr[i] = result[i].replace(eval(search), '<span style="background-color:yellow;">'+input+'</span>'); //находим нужные элементы, задаем стиль и сохраняем в новый массив
            }
            for(var i=0; i<result.length;i++) {
                pr=pr.replace(result[i],result_arr[i])  
            }
            document.body.innerHTML = pr;  
        }
    }
    function FindOnPageBack() { document.body.innerHTML = locale_HTML; }
    if(status) { FindOnPageBack(); FindOnPageGo(); } 
    if(!status) { FindOnPageBack(); } 
}