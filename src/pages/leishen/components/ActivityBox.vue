<template>
    <div v-if="cancelIcon" class="sd_activity_box">
        <a class="sd_cancel_icon" @click="cancelIconBox"></a>
        <a @click="goActivityDetail" class="sd_shine_box"></a>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import { Tooltip } from "element-ui";

    @Component
    export default class ActivityBox extends Vue {
        public cancelIcon: boolean = true;

        public cancelIconBox() {
            this.cancelIcon = false;
        }

        /**
         * 跳转活动详情
         */
        public goActivityDetail() {
            this.$emit("goto-activity-detail");
        }
    }

</script>

