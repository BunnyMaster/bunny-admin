<script lang="ts" setup>
import { emitter } from '@/utils/mitt';
import { useNav } from '@/layout/hooks/useNav';
import LaySearch from '../lay-search/index.vue';
import LayNotice from '../lay-notice/index.vue';
import { responsiveStorageNameSpace } from '@/config';
import { computed, nextTick, onMounted, ref } from 'vue';
import { isAllEmpty, storageLocal } from '@pureadmin/utils';
import { useTranslationLang } from '../../hooks/useTranslationLang';
import { usePermissionStoreHook } from '@/store/permission';
import LaySidebarItem from '../lay-sidebar/components/SidebarItem.vue';
import LaySidebarFullScreen from '../lay-sidebar/components/SidebarFullScreen.vue';

import GlobalizationIcon from '@/assets/svg/globalization.svg?component';
import LogoutCircleRLine from '@iconify-icons/ri/logout-circle-r-line';
import Setting from '@iconify-icons/ri/settings-3-line';
import Check from '@iconify-icons/ep/check';
import { $t } from '@/plugins/i18n';

const menuRef = ref();
const showLogo = ref(storageLocal().getItem<StorageConfigs>(`${responsiveStorageNameSpace()}configure`)?.showLogo ?? true);

const { t, route, locale, translationCh, translationEn } = useTranslationLang(menuRef);
const { title, logout, onPanel, getLogo, username, userAvatar, backTopMenu, avatarsStyle, getDropdownItemStyle, getDropdownItemClass } = useNav();

const defaultActive = computed(() => (!isAllEmpty(route.meta?.activePath) ? route.meta.activePath : route.path));

nextTick(() => {
	menuRef.value?.handleResize();
});

onMounted(() => {
	emitter.on('logoChange', key => {
		showLogo.value = key;
	});
});
</script>

<template>
	<div v-loading="usePermissionStoreHook().wholeMenus.length === 0" class="horizontal-header">
		<div v-if="showLogo" class="horizontal-header-left" @click="backTopMenu">
			<img :src="getLogo()" alt="logo" />
			<span>{{ title }}</span>
		</div>
		<el-menu ref="menuRef" :default-active="defaultActive" class="horizontal-header-menu" mode="horizontal" popper-class="pure-scrollbar">
			<LaySidebarItem v-for="route in usePermissionStoreHook().wholeMenus" :key="route.path" :base-path="route.path" :item="route" />
		</el-menu>
		<div class="horizontal-header-right">
			<!-- 菜单搜索 -->
			<LaySearch id="header-search" />
			<!-- 国际化 -->
			<el-dropdown id="header-translation" trigger="click">
				<GlobalizationIcon class="navbar-bg-hover w-[40px] h-[48px] p-[11px] cursor-pointer outline-none" />
				<template #dropdown>
					<el-dropdown-menu class="translation">
						<el-dropdown-item :class="['dark:!text-white', getDropdownItemClass(locale, 'zh')]" :style="getDropdownItemStyle(locale, 'zh')" @click="translationCh">
							<span v-show="locale === 'zh'" class="check-zh">
								<IconifyIconOffline :icon="Check" />
							</span>
							简体中文
						</el-dropdown-item>
						<el-dropdown-item :class="['dark:!text-white', getDropdownItemClass(locale, 'en')]" :style="getDropdownItemStyle(locale, 'en')" @click="translationEn">
							<span v-show="locale === 'en'" class="check-en">
								<IconifyIconOffline :icon="Check" />
							</span>
							English
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
			<!-- 全屏 -->
			<LaySidebarFullScreen id="full-screen" />
			<!-- 消息通知 -->
			<LayNotice id="header-notice" />
			<!-- 退出登录 -->
			<el-dropdown trigger="click">
				<span class="el-dropdown-link navbar-bg-hover">
					<img :src="userAvatar" :style="avatarsStyle" />
					<p v-if="username" class="dark:text-white">{{ username }}</p>
				</span>
				<template #dropdown>
					<el-dropdown-menu class="logout">
						<el-dropdown-item @click="logout">
							<IconifyIconOffline :icon="LogoutCircleRLine" style="margin: 5px" />
							{{ $t('buttons.pureLoginOut') }}
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
			<span :title="$t('buttons.pureOpenSystemSet')" class="set-icon navbar-bg-hover" @click="onPanel">
				<IconifyIconOffline :icon="Setting" />
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
:deep(.el-loading-mask) {
	opacity: 0.45;
}

.translation {
	::v-deep(.el-dropdown-menu__item) {
		padding: 5px 40px;
	}

	.check-zh {
		position: absolute;
		left: 20px;
	}

	.check-en {
		position: absolute;
		left: 20px;
	}
}

.logout {
	width: 120px;

	::v-deep(.el-dropdown-menu__item) {
		display: inline-flex;
		flex-wrap: wrap;
		min-width: 100%;
	}
}
</style>
