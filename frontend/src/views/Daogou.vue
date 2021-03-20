<template>
  <div class="daogou">
    <input type="text" class="search">
    <div class="categories"></div>
    <div class="recommand">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daogou {
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
}
.search {
  width: 500px;
  height: 40px;
}
.categories {
  width: 80%;
  height: 300px;
  border: 1px solid #d1d2d3;
  margin: 40px;
}
.recommand{
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 200px;

  & > div {
    height: 200px;
    width: 20%;
    border: 1px solid #d1d2d3;
  }
}
</style>
