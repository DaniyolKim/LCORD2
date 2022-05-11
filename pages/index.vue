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
            :src="videoBGPath"
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
          :draggable="false"
          :resizable="false"
        >
          <v-flex class="text-h6 text-center font-weight-bold">
            {{ matchInfo.title }}
          </v-flex>
          <v-container style="margin-top: -2px; margin-left: 0px; margin-right: 0px; margin-bottom: 0px;">
            <v-row class="ma-0">
              <v-col>
                <v-row>
                  <v-col class="ma-0 pa-0 mt-1 text-center" cols="9">
                    {{ getKorean(selectedMatch.leftPlayer) }}
                  </v-col>
                  <v-col class="ma-0 pa-0 text-right">
                    <v-chip color="primary" class="pa-0 pl-2 pr-2" style="font-weight: bold; font-size: 30px" label>
                      {{ matchInfo.leftCount }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col class="ma-0 pa-0 text-left">
                    <v-chip color="primary" class="pa-0 pl-2 pr-2" style="font-weight: bold; font-size: 30px" label>
                      {{ matchInfo.rightCount }}
                    </v-chip>
                  </v-col>
                  <v-col class="ma-0 pa-0 mt-1 text-center" cols="9">
                    {{ getKorean(selectedMatch.rightPlayer) }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="ma-0 mt-1">
              <v-col class="ma-0 pa-0 text-center" cols="3">
                {{ getEnglish(selectedMatch.leftPlayer) }}
              </v-col>
              <v-col cols="3" />
              <v-col cols="3" />
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
          <v-text-field
            v-model="matchInfo.title"
            class="centered-input text-title"
            label="경기 타이틀 입력"
            single-line
            hide-details
            flat
            solo
            @change="updateMatchInfo"
          />
          <v-simple-table style="opacity: 95%" class="gold-border">
            <template #default>
              <thead>
                <tr class="text-xl-h2">
                  <th>
                    <v-text-field
                      v-model="matchInfo.leftTeamName"
                      class="text-red centered-input text-td"
                      label="HOME팀 이름"
                      single-line
                      hide-details
                      flat
                      solo
                      @change="updateMatchInfo"
                    />
                  </th>
                  <th colspan="4" class="text-center" style="color: darkgoldenrod">
                    MATCH-UP
                  </th>
                  <th class="text-center" style="color: dodgerblue">
                    <v-text-field
                      v-model="matchInfo.rightTeamName"
                      class="text-blue centered-input text-td"
                      label="AWAY팀 이름"
                      single-line
                      hide-details
                      flat
                      solo
                      @change="updateMatchInfo"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(match, index) in matchInfo.matchList" :key="index" class="text-center text-xl-h1">
                  <td>
                    <v-text-field
                      v-model="match.leftPlayer"
                      class="centered-input text-td"
                      label="PLAYER"
                      single-line
                      hide-details
                      flat
                      solo
                      @change="updateMatchInfo"
                    />
                  </td>
                  <td class="bg-trans" style="min-width: 60px" @click="setWinner(match, 'LEFT')">
                    {{ checkWinner('LEFT', match.winner) }}
                  </td>
                  <td class="text-right">
                    <v-edit-dialog
                      :return-value-sync="match.tier"
                    >
                      {{ index+1 }}세트({{ match.tier }})
                      <template #input>
                        <v-text-field
                          v-model="match.tier"
                          label="TIER/2:2/3:3"
                          single-line
                          clearable
                          @change="updateMatchInfo"
                        />
                      </template>
                    </v-edit-dialog>
                  </td>
                  <td>
                    <v-text-field
                      v-model="match.map"
                      class="centered-input text-map text-td"
                      label="맵 이름"
                      single-line
                      hide-details
                      flat
                      solo
                      @change="updateMatchInfo"
                    />
                  </td>
                  <td class="bg-trans" style="min-width: 60px" @click="setWinner(match, 'RIGHT')">
                    {{ checkWinner('RIGHT', match.winner) }}
                  </td>
                  <td>
                    <v-text-field
                      v-model="match.rightPlayer"
                      class="centered-input text-td"
                      label="PLAYER"
                      single-line
                      hide-details
                      flat
                      solo
                      @change="updateMatchInfo"
                    />
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
          :z="1"
          :x="270"
          :y="650"
          :w="300"
          :h="250"
          :draggable="true"
          :active="true"
        >
          <iframe
            :src="chatSrc"
            width="100%"
            height="100%"
            style="padding: 10px 0px 10px 10px; border: none"
          />
        </vue-draggable-resizable>
        <!--알림 위젯-->
        <vue-draggable-resizable
          v-show="showNoti"
          class="none-style"
          :parent="true"
          :z="1"
          :x="600"
          :y="760"
          :w="220"
          :h="140"
          :draggable="true"
          :active="true"
        >
          <iframe
            :src="notiSrc"
            width="100%"
            height="100%"
            style="padding: 10px 10px 10px 10px; border: none"
          />
        </vue-draggable-resizable>
      </v-col>
      <!--설정-->
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
              <v-row>
                <v-col cols="4">
                  <v-checkbox v-model="showBG" label="배경" hide-details />
                </v-col>
                <v-col cols="8">
                  <v-select v-model="videoBGSrc" :items="bgList" hide-details @change="updateBGSrc" />
                </v-col>
              </v-row>
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
                @change="updateChatSrc"
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
                @change="updateNotiSrc"
              />
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'IndexPage',
  data () {
    return {
      minWidth: 1600,
      minHeight: 900,
      sbMiniSrc: require('@/assets/scoreboard_mini1.png'),
      matchType: 'team',
      layoutType: 'wide',
      isPlaying: false,
      showBG: true,
      showScoreBig: true,
      showScoreMini: false,
      showChat: false,
      showNoti: false,
      showExpandMatchType: false,
      showExpandLayoutType: false,
      showExpandWidgets: true,
      bgList: ['MilkyWay', 'Particles', 'Dots']
    }
  },
  computed: {
    labelIsPlaying () {
      if (this.isPlaying) {
        return '게임 진행중'
      } else {
        return '게임 대기중'
      }
    },
    selectedMatch () {
      if (this.matchInfo.selIndex < this.matchInfo.matchList.length) {
        return this.matchInfo.matchList[this.matchInfo.selIndex]
      } else {
        return { leftPlayer: '게임FIN', map: '', rightPlayer: '종료END', winner: '' }
      }
    },
    matchInfo () {
      return JSON.parse(JSON.stringify(this.matchInfoStore))
    },
    videoBGPath () {
      return require('@/static/' + this.videoBGSrc + '.mp4')
    },
    ...mapGetters({
      matchInfoStore: 'matchInfo/getMatchInfo',
      chatSrc: 'widgetSrc/getChatSrc',
      notiSrc: 'widgetSrc/getNotiSrc',
      videoBGSrc: 'widgetSrc/getVideoBGSrc'
    })
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
      this.matchInfo.leftCount = 0
      this.matchInfo.rightCount = 0
      this.matchInfo.matchList.forEach((match) => {
        if (match.winner !== '') {
          cnt++
        }

        if (match.winner === 'LEFT') {
          this.matchInfo.leftCount++
        }

        if (match.winner === 'RIGHT') {
          this.matchInfo.rightCount++
        }
      })
      this.matchInfo.selIndex = cnt
      this.updateMatchInfo()
    },
    getKorean (players) {
      return players.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi, ' ')
    },
    getEnglish (players) {
      return players.replace(/[^a-zA-Z0-9]/g, '')
    },
    updateMatchInfo () {
      this.updateMatchInfoStore(this.matchInfo)
    },
    updateChatSrc (value) {
      this.updateChatSrcStore(value)
    },
    updateNotiSrc (value) {
      this.updateNotiSrcStore(value)
    },
    updateBGSrc (value) {
      this.updateBGSrcStore(value)
    },
    ...mapMutations({
      updateMatchInfoStore: 'matchInfo/update',
      updateChatSrcStore: 'widgetSrc/updateChatSrc',
      updateNotiSrcStore: 'widgetSrc/updateNotiSrc',
      updateBGSrcStore: 'widgetSrc/updateBGSrc'
    })
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
  .text-map { max-width: 200px; }
  /deep/ .centered-input input { text-align: center; border-style: none; max-height: none !important; }
  /deep/ .text-title { font-size: 80px; height: 100px; font-weight: bold; }
  /deep/ .theme--dark.v-text-field--solo > .v-input__control > .v-input__slot { background: none }
  .text-td { font-size: 28px; }
  /deep/ .v-input__slot { padding: 0px !important; }
  /deep/ .text-red input { color: red !important; background: black; }
  /deep/ .text-blue input { color: dodgerblue !important; background: black; }
</style>
