<template>
    <div class="city">
        <div class="city-wrapper city-wrapper-hook">
            <div class="scroller-hook">
                <div class="cities cities-hook">
                    <div v-for="i in MobileCountryList" :key="i.label">
                        <a class="title" :name="i.label">{{i.label}}</a>
                        <ul class="cityBlock">
                            <li v-for="item in i.options" :key="item.code" class="city_cell" :data-name="item.name"
                                :data-code="item.code" :data-ico="item.ico" @click="pushcountry(item)">
                                <img v-show="!item.ico" src="../images/countrydefault.png" alt="">
                                <img v-show="item.ico" :src="item.ico" alt="">
                                <span class="cityname">{{item.name}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="shortcut shortcut-hook">
                <div style="width: 50px;text-align: center;padding: 20px 0">
                    <a v-for="i in MobileCountryList" :href="'#'+i.label" :key="i.label" :data-anchor="i.label" class="shortcutName">
                        {{i.label}}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./Country.ts" lang="ts"></script>

