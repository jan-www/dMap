<template>
  <div class="wrapper">
    <m-header :collapse="false"></m-header>
    <section class="section section-banner">
      <div class="container">
        <div class="logo">
          <svg width="161px" height="160px" viewBox="0 0 161 160" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
              <linearGradient x1="22.5170547%" y1="8.01121418%" x2="96.9400333%" y2="96.3671667%" id="linearGradient-1">
                <stop stop-color="#66C7FF" offset="0%"></stop>
                <stop stop-color="#3473E7" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Desktop-HD-Copy-2" transform="translate(-640.000000, -245.000000)" fill="url(#linearGradient-1)">
                <path d="M801,245 L801,405 L718.862712,405 C704.67281,404.638416 691.529157,400.841844 679.431356,393.610169 C667.333555,386.378495 657.737324,376.706275 650.642373,364.59322 C643.547422,352.299374 640,339.101765 640,325 C640,310.536651 643.592902,297.158254 650.778814,284.864407 C657.964725,272.57056 667.742876,262.807946 680.113559,255.576271 C692.484243,248.525388 705.946255,245 720.5,245 C729.414169,245 738.009846,246.355919 746.287288,249.067797 C754.564731,251.779675 762.068893,255.666641 768.8,260.728814 L768.8,245 L801,245 Z M768.8,325 C768.8,318.672285 767.572046,312.570651 765.116102,306.694915 C762.660157,300.81918 759.158215,295.621492 754.610169,291.101695 C750.062124,286.581898 744.83195,283.101707 738.919492,280.661017 C733.007033,278.220327 726.867263,277 720.5,277 C707.765473,277 696.39553,281.700518 686.389831,291.101695 C681.841785,295.621492 678.385323,300.81918 676.020339,306.694915 C673.655355,312.570651 672.472881,318.672285 672.472881,325 C672.472881,337.836222 677.111818,349.135544 686.389831,358.898305 C696.213608,368.11869 707.583551,372.728814 720.5,372.728814 L768.8,372.728814 L768.8,325 Z" id="a-copy-4"></path>
              </g>
            </g>
          </svg>
        </div>
        <h1>A lightweight, data-driven spatial-temporial data visualization library</h1>
        <div class="btn-container">
          <div class="btn btn-begin"><router-link :to="{ name: 'Introduction-en' }">Start</router-link></div>
          <div class="btn btn-github"><a href="https://github.com/sugarspectre/dMap/" target="_blank">Github</a></div>
        </div>
      </div>
    </section>
    <section class="section section-navigation">
      <div class="container flex flex-around" style="margin-bottom: 40px">
        <div class="navigation-panel">
          <div class="icon-cnt">
            <img src="../assets/icon-navigation-1.png" alt="">
          </div>
          <div class="title">Guide</div>
          <div class="desc">了解dMap设计思路，快速入门</div>
          <div class="btn-readmore"><router-link :to="{ name: 'Guide-en' }">Detail <i class="icon icon-chevron-right"></i></router-link></div>
        </div>
        <div class="navigation-panel">
          <div class="icon-cnt">
            <img src="../assets/icon-navigation-2.png" alt="">
          </div>
          <div class="title">API</div>
          <div class="desc">查看API文档，了解配置详情</div>
          <div class="btn-readmore"><router-link :to="{ name: 'Docs-en' }">Detail <i class="icon icon-chevron-right"></i></router-link></div>
        </div>
        <div class="navigation-panel">
          <div class="icon-cnt">
            <img src="../assets/icon-navigation-3.png" alt="">
          </div>
          <div class="title">Demo</div>
          <div class="desc">提供丰富的展示案例，便于您调用和扩展</div>
          <div class="btn-readmore"><router-link :to="{ name: 'Demo-en' }">Detail <i class="icon icon-chevron-right"></i></router-link></div>
        </div>
      </div>
    </section>
    <m-footer></m-footer>
  </div>
</template>

<script>
import MHeader from '../components/header'
import MFooter from '../components/footer'

export default {
  components: {
    MHeader,
    MFooter
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/index';
</style>
