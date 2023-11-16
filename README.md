# final-project-narrativemaps
final-project-narrativemaps created by GitHub Classroom
[Online Demo](https://hconhisway.github.io/NarrativeMaps/)



当然，我可以为您提供的每个 JavaScript 数组和字符串方法的具体用法。

数组方法

变异方法

1. push()
   ```javascript
   // 向数组末尾添加元素
   array.push(element1, ..., elementN);
   ```

2. pop()
   ```javascript
   // 删除数组最后一个元素
   var lastElement = array.pop();
   ```

3. shift()
   ```javascript
   // 删除数组第一个元素
   var firstElement = array.shift();
   ```

4. unshift()
   ```javascript
   // 向数组开头添加元素
   array.unshift(element1, ..., elementN);
   ```

5. splice()
   ```javascript
   // 删除或替换数组的元素，或向数组添加新元素
   array.splice(start, deleteCount, item1, ..., itemN);
   ```

6. sort()
   ```javascript
   // 对数组元素进行排序
   array.sort(function(a, b){ return a - b });
   ```

7. reverse()
   ```javascript
   // 颠倒数组中元素的顺序
   array.reverse();
   ```

非变异方法

1. concat()
   ```javascript
   // 合并两个或多个数组
   var newArray = array1.concat(array2, ..., arrayN);
   ```

2. slice()
   ```javascript
   // 返回数组的一部分
   var newArray = array.slice(start, end);
   ```

3. join()
   ```javascript
   // 将数组的所有元素连接成一个字符串
   var str = array.join(separator);
   ```

4. indexOf()
   ```javascript
   // 返回数组中首次出现的指定元素的索引
   var index = array.indexOf(searchElement, fromIndex);
   ```

5. lastIndexOf()
   ```javascript
   // 返回数组中最后一次出现的指定元素的索引
   var index = array.lastIndexOf(searchElement, fromIndex);
   ```

6. find()
   ```javascript
   // 返回数组中满足提供的测试函数的第一个元素的值
   var found = array.find(function(element) { return element > 10; });
   ```

7. findIndex()
   ```javascript
   // 返回数组中满足提供的测试函数的第一个元素的索引
   var index = array.findIndex(function(element) { return element > 10; });
   ```

8. filter()
   ```javascript
   // 创建一个新数组，其包含通过所提供函数测试的所有元素
   var filtered = array.filter(function(element) { return element > 10; });
   ```

9. map()
   ```javascript
   // 创建一个新数组，其结果是该数组中的每个元素调用一次提供的函数
   var mapped = array.map(function(element) { return element * 2; });
   ```

10. forEach()
    ```javascript
    // 对数组的每个元素执行一次提供的函数
    array.forEach(function(element) { console.log(element); });
    ```

11. reduce()
    ```javascript
    // 对累加器和数组中的每个元素（从左到右）应用一个函数，将其简化为单个值
    var sum = array.reduce(function(accumulator, currentValue) { return accumulator + currentValue; }, 0);
    ```

12. reduceRight()
    ```javascript
    // 与 reduce 相似，但从右到左应用函数
    var sum = array.reduceRight(function(accumulator, currentValue) { return accumulator + currentValue; }, 0);
    ```

13. every()
    ```javascript
    // 检测数组所有元素是否都符合指定条件
    var allPass = array.every(function(element) { return element > 10; });
    ```

14. some()
    ```javascript
    // 检测数组中的某些元素是否符合指定条件
    var anyPass = array.some(function(element) { return element > 10; });
    ```

15. includes()
    ```javascript
    // 判断数组是否包含指定元素
    var contains = array.includes(element, fromIndex);
    ```

字符串方法

字符串方法不会改变原始字符串

，因为字符串在 JavaScript 中是不可变的。

1. charAt()
   ```javascript
   // 返回特定位置的字符
   var character = str.charAt(index);
   ```

2. concat()
   ```javascript
   // 连接两个或多个字符串
   var newStr = str1.concat(str2, ..., strN);
   ```

3. includes()
   ```javascript
   // 判断字符串是否包含指定的子字符串
   var isIncluded = str.includes(searchString, position);
   ```

4. indexOf()
   ```javascript
   // 返回某个指定的子字符串在字符串中首次出现的位置
   var index = str.indexOf(searchValue, fromIndex);
   ```

5. lastIndexOf()
   ```javascript
   // 返回某个指定的子字符串在字符串中最后一次出现的位置
   var index = str.lastIndexOf(searchValue, fromIndex);
   ```

6. match()
   ```javascript
   // 检索返回一个字符串匹配正则表达式的结果
   var matches = str.match(regexp);
   ```

7. repeat()
   ```javascript
   // 返回一个新字符串，表示将原字符串重复指定次数
   var repeated = str.repeat(count);
   ```

8. replace()
   ```javascript
   // 返回一个新字符串，其中某些或所有匹配的模式被替代
   var newStr = str.replace(regexpOrSubstr, newSubstrOrFunction);
   ```

9. search()
   ```javascript
   // 对正则表达式和指定字符串进行匹配搜索
   var index = str.search(regexp);
   ```

10. slice()
    ```javascript
    // 提取字符串的某个部分并返回一个新字符串
    var newStr = str.slice(beginIndex, endIndex);
    ```

11. split()
    ```javascript
    // 通过分割字符串成子字符串来将字符串分割成字符串数组
    var array = str.split(separator, limit);
    ```

12. substring()
    ```javascript
    // 返回字符串的子集
    var newStr = str.substring(indexStart, indexEnd);
    ```

13. toLowerCase()
    ```javascript
    // 把字符串转换为小写
    var lowerStr = str.toLowerCase();
    ```

14. toUpperCase()
    ```javascript
    // 把字符串转换为大写
    var upperStr = str.toUpperCase();
    ```

15. trim()
    ```javascript
    // 从字符串的两端删除空白字符和其他预定义字符
    var trimmedStr = str.trim();
    ```

这些是 JavaScript 中常用的数组和字符串方法的基本用法。理解这些方法如何工作对于编写高效、可读性强的代码至关重要。
