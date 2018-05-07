<template>
  <div class="container-fluid activity">
    <label>活動名稱</label>
    <input type="text" placeholder="請輸入活動名稱">
    <label>海灘名稱</label>
    <input type="text" placeholder="請輸入活動名稱">
    <label>活動介紹文字</label>
    <textarea placeholder="請輸入活動名稱"></textarea>
    <label>聯絡人</label>
    <input type="text" placeholder="請輸入活動名稱">
    <label>聯絡電話</label>
    <input type="text" placeholder="請輸入活動名稱">
    <label>活動時間</label>
    <input type="date" placeholder="請輸入活動名稱">
    <label>集合地點</label>
    <input type="text" placeholder="請輸入活動名稱">
    <button>發起活動！</button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.activity {
  height: 600px;
  border: 1px solid black;
  position: relative;
}

label {
  display: block;
  margin: 0;
  padding: 5px 0;
  font-size: 1rem;
}

input, textarea {
  height: 35px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  padding: 5px 10px;
}

textarea {
  height: 70px;
}

button {
  position: absolute;
  right: 15px;
  bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  color: #ffffff;
  padding: 5px 15px;
  background: #666666;
}
</style>
