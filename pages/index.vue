<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <v-row>
      <v-col cols="10" class="pa-0" style="background-color: green; width: 1600px; height: 900px">
        <!--배경-->
        <vue-draggable-resizable
          v-show="showBG"
          class="none-style"
          :parent="true"
          :z="1"
          :w="1610"
          :h="900"
          :draggable="false"
          :resizable="false"
          :active="false"
        >
          <video
            width="100%"
            height="100%"
            src="../static/milky_way.mp4"
            autoplay
            loop
            muted
          />
        </vue-draggable-resizable>
        <!--엘크 로고-->
        <vue-draggable-resizable
          class="none-style"
          :parent="true"
          :w="20"
          :x="5"
          :y="5"
          :z="2"
          :draggable="false"
          :resizable="false"
        >
          <img src="../static/lgcraft.png" width="75" />
        </vue-draggable-resizable>
        <!--미니 점수판-->
        <vue-draggable-resizable
          v-show="showScoreMini"
          class="none-style bgSbMini"
          :parent="true"
          :w="280"
          :x="0"
          :y="548"
          :z="2"
          :resizable="false"
        >
          <v-flex class='text-h6 text-center font-weight-bold'>
            {{ matchTitle }}
          </v-flex>
          <v-container class="ma-0">
            <v-row class="ma-0">
              <v-col class="ma-0 pa-0 text-center" cols="5">
                <v-flex style="margin-top: 3px">
                  {{ getKorean(selectedMatch.leftPlayer) }}
                </v-flex>
              </v-col>
              <v-col class="ma-0 pa-0" cols="1">
                <v-chip color="primary" style="width: 32px; padding-left: 3px; font-size: 30px; font-weight: bolder" label>
                  {{ leftCount }}
                </v-chip>
              </v-col>
              <v-col class="ma-0 pa-0" cols="1">
                <v-chip color="primary" style="width: 32px; padding-left: 3px; font-size: 30px; font-weight: bolder" label>
                  {{ rightCount }}
                </v-chip>
              </v-col>
              <v-col class="ma-0 pa-0 text-center" cols="5">
                <v-flex style="margin-top: 3px">
                  {{ getKorean(selectedMatch.rightPlayer) }}
                </v-flex>
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-col class="ma-0 pa-0 text-center" cols="3">
                {{ getEnglish(selectedMatch.leftPlayer) }}
              </v-col>
              <v-col cols="3"></v-col>
              <v-col cols="3"></v-col>
              <v-col class="ma-0 pa-0 text-center" cols="3">
                {{ getEnglish(selectedMatch.rightPlayer) }}
              </v-col>
            </v-row>
          </v-container>
        </vue-draggable-resizable>
        <!--대형 점수판-->
        <vue-draggable-resizable
          v-show="showScoreBig"
          class="none-style"
          :parent="true"
          :z="1"
          :w="1400"
          :h="600"
          :x="100"
          :y="30"
          :draggable="false"
          :resizable="false"
          :active="false"
        >
          <v-flex class="text-h1 font-weight-bold text-center mb-3">
            {{ matchTitle }}
          </v-flex>
          <v-simple-table style="opacity: 80%" class="gold-border">
            <template #default>
              <thead>
                <tr class="text-xl-h2">
                  <th class="text-center" style="color: red">
                    1팀
                  </th>
                  <th colspan="4" class="text-center" style="color: darkgoldenrod">
                    TONIGHT'S MATCH-UP
                  </th>
                  <th class="text-center" style="color: dodgerblue">
                    2팀
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(match, index) in matchList" :key="index" class="text-center text-xl-h1">
                  <td>
                    {{ match.leftPlayer }}
                  </td>
                  <td class="bg-trans" style="min-width: 60px" @click="setWinner(match, 'LEFT')">
                    {{ checkWinner('LEFT', match.winner) }}
                  </td>
                  <td class="text-right">
                    {{ index+1 }}세트({{ match.tier }})
                  </td>
                  <td>
                    {{ match.map }}
                  </td>
                  <td class="bg-trans" style="min-width: 60px" @click="setWinner(match, 'RIGHT')">
                    {{ checkWinner('RIGHT', match.winner) }}
                  </td>
                  <td>
                    {{ match.rightPlayer }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </vue-draggable-resizable>
        <!--채팅 위젯-->
        <vue-draggable-resizable
          v-show="showChat"
          class="none-style"
          :parent="true"
          :z="3"
          :x="1304"
          :y="448"
          :w="300"
          :h="200"
        >
          <iframe
            :src="chatSrc"
            width="100%"
            height="100%"
            style="padding: 10px 0px 10px 10px"
          />
        </vue-draggable-resizable>
        <!--알림 위젯-->
        <vue-draggable-resizable
          v-show="showNoti"
          class="none-style"
          :parent="true"
          :z="3"
          :x="700"
          :y="700"
          :w="300"
          :h="200"
        >
          <iframe
            :src="notiSrc"
            width="100%"
            height="100%"
            style="padding: 10px 10px 10px 10px"
          />
        </vue-draggable-resizable>
      </v-col>
      <v-col cols="2">
        <v-card>
          <v-card-actions>
            <v-flex>경기 종류 선택</v-flex>
            <v-spacer />
            <v-btn
              icon
              @click="showExpandMatchType = !showExpandMatchType"
            >
              <v-icon>{{ showExpandMatchType ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="showExpandMatchType" class="pa-3">
              <v-radio-group v-model="matchType" class="pa-0">
                <v-radio label="멸망전/팀 경기" value="team" />
                <v-radio label="개인전" value="personal" />
                <v-radio label="겟투게더" value="getTogether" />
              </v-radio-group>
            </div>
          </v-expand-transition>
        </v-card>
        <v-card class="mt-3">
          <v-card-actions>
            <v-flex>레이아웃 선택</v-flex>
            <v-spacer />
            <v-btn
              icon
              @click="showExpandLayoutType = !showExpandLayoutType"
            >
              <v-icon>{{ showExpandLayoutType ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="showExpandLayoutType" class="pa-3">
              <v-radio-group v-model="layoutType" class="pa-0" row>
                <v-radio label="16:9" value="wide" />
                <v-radio label="4:3" value="narrow" />
              </v-radio-group>
            </div>
          </v-expand-transition>
        </v-card>
        <v-card class="mt-3">
          <v-card-actions>
            <v-flex>위젯 보이기/숨기기</v-flex>
            <v-spacer />
            <v-btn
              icon
              @click="showExpandWidgets = !showExpandWidgets"
            >
              <v-icon>{{ showExpandWidgets ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="showExpandWidgets" class="pa-3">
              <v-switch
                v-model="isPlaying"
                :label="labelIsPlaying"
                hide-details
                @change="changePlayStatus"
              />
              <v-checkbox v-model="showBG" label="배경" hide-details />
              <v-checkbox v-model="showScoreBig" label="대형 점수판" hide-details />
              <v-checkbox v-model="showScoreMini" label="미니 점수판" hide-details />
              <v-checkbox v-model="showChat" label="전자비서 - 채팅" hide-details />
              <v-textarea
                v-show="showChat"
                v-model="chatSrc"
                class="pt-3"
                label="채팅 링크"
                outlined
                rows="2"
                hide-details
              />
              <v-checkbox v-model="showNoti" label="전자비서 - 알림" hide-details />
              <v-textarea
                v-show="showNoti"
                v-model="notiSrc"
                class="pt-3"
                label="알림 링크"
                outlined
                rows="2"
                hide-details
              />
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      minWidth: 1600,
      minHeight: 900,
      videoBGSrc: '',
      sbMiniSrc: require('@/assets/scoreboard_mini1.png'),
      matchType: 'team',
      layoutType: 'wide',
      isPlaying: false,
      showBG: true,
      showScoreBig: true,
      showScoreMini: false,
      showChat: false,
      showNoti: false,
      chatSrc: 'https://aqua.afreecatv.com/component.php?szKey=.A32.7bbT56vyHM9fKZk.BjX963Nv1pTSfCuUw3eGwJ_dxhI9abfgfG6Mwt5a5xClg0YAX52omHs8sJj920Jwuv-YX0BNxTwnEhS2vfcgUWpQ3N5OJHyjC1Llen_qiQY',
      notiSrc: 'https://aqua.afreecatv.com/component.php?szKey=.A32.7bbT56vyHM9fKZk.BjX963Nv1pTSfCuUw3eGwJ_dxhI9abfgfG6Mwt5a5xDEyChIGDIBdvLGtbFJky-HrW3EWQjIJQhfcvxj6WsisztXPPCJTia6zX50FG8mibw',
      matchTitle: '멸망전 시즌5 준PO 2차전',
      matchList: [
        { tier: 'ANI', leftPlayer: '전은후P', map: '굳나잇', rightPlayer: '김태훈P', winner: '' },
        { tier: 'HUM', leftPlayer: '변진황P', map: '이클립스', rightPlayer: '', winner: '' },
        { tier: '2:2', leftPlayer: '이대연Z 양현철P', map: '헌터', rightPlayer: '', winner: '' },
        { tier: 'AMO', leftPlayer: '박아별T', map: '폴리포이드', rightPlayer: '', winner: '' },
        { tier: 'GOD', leftPlayer: '문명훈P', map: '라르고', rightPlayer: '', winner: '' },
        { tier: '3:3', leftPlayer: '진영P 경호T 태욱Z', map: '빠른무한', rightPlayer: '태훈P 태훈P 태훈P', winner: '' },
        { tier: 'GOD', leftPlayer: 'TBD', map: '어센션', rightPlayer: 'TBD', winner: '' }
      ],
      showExpandMatchType: true,
      showExpandLayoutType: true,
      showExpandWidgets: true,
      selIndex: 0,
      leftCount: 0,
      rightCount: 0
    }
  },
  computed: {
    labelIsPlaying () {
      if (this.isPlaying) {
        return 'On playing'
      } else {
        return 'Break time'
      }
    },
    selectedMatch () {
      if (this.selIndex < this.matchList.length) {
        return this.matchList[this.selIndex]
      } else {
        return { leftPlayer: '게임FIN', map: '', rightPlayer: '종료END', winner: '' }
      }
    }
  },
  methods: {
    changePlayStatus () {
      if (this.isPlaying) {
        this.showBG = false
        this.showScoreBig = false
        this.showScoreMini = true
        this.showChat = true
        this.showNoti = true
      } else {
        this.showBG = true
        this.showScoreBig = true
        this.showScoreMini = false
        this.showChat = false
        this.showNoti = false
      }
    },
    checkWinner (position, winner) {
      if (position === winner) {
        return 'W'
      } else {
        return ''
      }
    },
    setWinner (match, winner) {
      if (match.winner === winner) {
        match.winner = ''
      } else {
        match.winner = winner
      }
      let cnt = 0
      this.leftCount = 0
      this.rightCount = 0
      this.matchList.forEach((match) => {
        if (match.winner !== '') {
          cnt++
        }

        if (match.winner === 'LEFT') {
          this.leftCount++
        }

        if (match.winner === 'RIGHT') {
          this.rightCount++
        }
      })
      this.selIndex = cnt
    },
    getKorean (players) {
      return players.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi, ' ')
    },
    getEnglish (players) {
      return players.replace(/[^a-zA-Z0-9]/g, '')
    }
  }
}
</script>
<style scoped>
  .container { padding: 0px; margin: 10px; max-width: 99vw; }
  .none-style { border: none; padding: 0; margin: 0; }
  .gold-border { border: solid 1px darkgoldenrod }
  video { object-fit: fill; }
  .v-data-table__wrapper table thead th { font-size: 40px !important; background-color: black; }
  .v-data-table__wrapper table tbody td { font-size: 32px !important; font-weight: bolder; }
  .bg-trans { background-color: black; color: white; }
  .bgSbMini { background-image: url("../assets/scoreboard_mini1.png"); background-repeat : no-repeat; background-size : contain; }
</style>
