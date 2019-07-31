<template>
<div class="chartBackground">
  <div class="cb">
    <div class="ssafy">
      <ssafy></ssafy>
    </div>
    <div class="cb-header">
      <h3>SSAFY 커뮤니티에 오신것을 환영합니다.</h3>
    </div>
    <div class="cb-content">
      <h1>저희 프로젝트의 Git Commit 그래프를 확인할 수 있어요</h1>
    </div>
  <section>
    <!-- <div class= "arrow"></div>
    <div class= "arrow"></div>
    <div class= "arrow"></div>
    <div class= "arrow"></div>
    <div class= "arrow"></div> -->
    <i class="material-icons arrow sq">keyboard_arrow_down</i>
    <i class="material-icons up">keyboard_arrow_up</i>
    <i class="material-icons arrow sq">keyboard_arrow_down</i>
    <i class="material-icons arrow sq">keyboard_arrow_down</i>
    <i class="material-icons arrow sq">keyboard_arrow_down</i>
    <i class="material-icons arrow sq">keyboard_arrow_down</i>
  </section>
  </div>


    <div class="chart">
      <canvas class="hidden-xs-only" ref="mixChart" id="mixChart" width="500" height="200"></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import ssafy from './ssafy.vue';

function getDateRange(startDate, endDate, listDate) {
  if(startDate > endDate) {
    let temp; 
    temp = startDate;
    startDate = endDate;
    endDate = temp;
  }

  var dateMove = new Date(startDate);
  var strDate = startDate;
  if (startDate == endDate) {
    var strDate = dateMove.toISOString().slice(0, 10);
    listDate.push(strDate);
  } else {
    while (strDate < endDate) {
      var strDate = dateMove.toISOString().slice(0, 10);
      listDate.push(strDate);
      dateMove.setDate(dateMove.getDate() + 1);
    }
  }
  return listDate;
}

function getDateItem(range, data){
  let arr = new Array();
  for (let i = 0; i< range.length;i++){
    arr.push(0)
  }
  
  for (let i = 0; i< range.length;i++){
    for (let j = 0; j< data.length;j++){
      if (range[i] === data[j]){
        arr[i] += 1;
      }
    }
  }
  return arr;
}



export default {
  data() {
    return {
      labelData: [],
      data: [],
      maxheight: '',
      
    };
  },
  components: {
    ssafy,
  },
  methods: {
    setdate(date) {
      const startdate = moment(date[date.length - 1].committed_date).format(
        "YYYY-MM-DD"
      );
      const enddate = moment(date[0].committed_date).format("YYYY-MM-DD");
      let listDate = [];
      getDateRange(startdate, enddate, listDate);
      // console.log(listDate);
      this.labelData = listDate;


      let curDate = [];
      date.forEach(item => {
        const ce = moment(item.committed_date).format("YYYY-MM-DD");
        curDate.push(ce);
      })
      curDate.sort();
      this.data = getDateItem(listDate, curDate);
      this.maxheight = Math.max(...this.data);
    },
    getGraph() {
      var ctx = this.$refs.mixChart.getContext("2d");
      var chart = new this.$_Chart(ctx, {
        type: "bar",
        data: {
          labels: this.labelData,
          datasets: [
            {
              label: "Bar Dataset",
              data: this.data,
            },
            {
              label: "Line Dataset",
              data: this.data,
              type: "line",
              backgroundColor : "rgba(0,0,0,0)",
              borderColor : "#f00",
              lineTension : 0
            }
          ]
        },
        options : {
          scales: {
              yAxes: [{
                ticks: {
                max: this.maxheight + 1,
                min: 0,
                stepSize: 0,

                gridLines: {
                offsetGridLines: false,
                }

            }
              }]
            }   
          },
      });
    },
  },

  computed: {
    returnlabel() {
      return this.labelData;
    }
  },
  created() {
    axios
      .get("https://lab.ssafy.com/api/v4/projects/6076/repository/commits?private_token=MXg2sbAb2e_B2UuKVGcW&all=true&per_page=176")
      .then(response => {
        this.setdate(response.data);
        this.getGraph();
        })
      .catch(err => console.log(err));
  },
  mounted() {
    
    const delay = time => new Promise(resolve => setTimeout(resolve,time))
    let time = 0;
    let time2 = 0;
    let grids = document.querySelectorAll('.arrow');

    
    // arrow animation
    document.querySelector('section').addEventListener('mouseover',()=>{
      if (time === 0) {
      grids.forEach(grid => {
        delay(0).then(()=> {
          setTimeout(() => {
            grid.style.color = 'yellow';
            grid.style.transform = 'scale(5.6,4.6)'
          }, time+=100)
        })
  
        delay(100).then(()=> {
          setTimeout(() => {
            grid.style.color = 'white';
            grid.style.transform = 'scale(5,4)'
          }, time2+=100)
        })

        delay(700).then(()=> {
          time = 0;
          time2 = 0;
        })
      })
    }
    })

    // show
    let show = false
    document.querySelector('section').addEventListener('click',() => {
      let h = document.querySelector('.chartBackground');
      let c = document.querySelector('.chart');
      let sq = document.querySelectorAll('.sq');
      let up = document.querySelector('.up');
      
      if (!show){
        h.style.height = "1000px";
        sq.forEach(s => {
          s.style.display = "none";
        })
        c.style.opacity = "1"
        up.style.display = "block"

        show = true;

      } else {
        h.style.height = "550px";
        sq.forEach(s => {
          s.style.display = "block";
        })
        up.style.display = "none"
        c.style.opacity = "0"
        show = false;

      }
    })
  }
};
</script>

<style scoped>
.chartBackground{
  transition: all .4s;
  width:100%;
  background-color: #084035;
  height:550px;
}

.cb{
  width:500px;
  position:relative;
  top:18rem;
  left:50%;
  transform: translate(-50%,-50%);
}

.cb-header{
  color: white;
  text-align: center;
}

.cb-header h3{
  font-weight: 200;
}

.cb-content{
  margin-top:15px;
  color: white;
  /* width:500px; */
  text-align: center;
}

.chart{
  opacity:0;
  transition: all .3s;
  background: white;
  border:3px solid black;
  border-radius: 30px;
  /* z-index:5; */
  margin: auto;
  width:1000px;
  height:400px;
  position: relative;
  top: 250px;
}

@media screen and (min-width: 960px) and (max-width:1263px) {
  .chart {
    width:800px;
    height:330px;
  }
}

@media screen and (min-width: 600px) and (max-width:959px) {
  .chart {
    width:600px;
    height:260px;
  }
}

@media screen and (max-width:599px) {
  .chart {
    display:none;
  }
}


.ssafy{
  width:300px;
  opacity: 0.8;
  position:relative;
  left:20%;
  margin-bottom:20px;
}

section {
  width:70px;
  position:relative;
  top:70px;
  margin:0 auto;
  display:grid;
  grid-template-rows: repeat(5,auto);
  cursor: pointer;
}


.arrow {
  margin-bottom:5px;
  color: white;
  transform: scale(5,4);
  /* background-color: white; */
  height:20px;
  width:20px;
}

.up {
  display:none;
  margin-bottom:5px;
  color: white;
  transform: scale(5,4);
  /* background-color: white; */
  height:20px;
  width:20px;
}

</style>