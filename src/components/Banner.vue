<template>
  <div>
    <header class="container-fluid view-area">
        <div class="banner">
            <img src="https://picsum.photos/1366/400/?gravity=center" alt="" class="img-fluid d-block">
        </div>
    </header>
    <div>
      <nav class="navbar navbar-expand-md navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <router-link 
            tag="li" 
            class="nav-item" 
            active-class="active"
            exact
            to="/">
            <a class="nav-link">淨灘首頁</a>
            </router-link>
            <router-link 
            tag="li" 
            class="nav-item" 
            active-class="active" 
            to="/activity">
            <a class="nav-link">發起活動</a>
            </router-link>
            <router-link 
            tag="li" 
            class="nav-item" 
            active-class="active" 
            to="/report">
            <a class="nav-link">回報海灘</a>
            </router-link>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  background: #f8f9fa;
}

.banner {
  width: 100%;
}

img {
  width: 100%;
}
</style>
