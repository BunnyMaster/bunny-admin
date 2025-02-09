import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';
import { ElTag } from 'element-plus';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: '序号', minWidth: 60 },
	// 模板名称
	{ label: $t('emailTemplate_templateName'), prop: 'templateName', minWidth: 150 },
	// 模板名称
	{ label: $t('emailTemplate_emailUser'), prop: 'emailUser', slot: 'emailUser', minWidth: 180 },
	// 主题
	{ label: $t('emailTemplate_subject'), prop: 'subject', minWidth: 200 },
	// 邮件内容
	{ label: $t('emailTemplate_body'), prop: 'body', minWidth: 150 },
	// 邮件类型
	{ label: $t('emailTemplate_type'), prop: 'summary', minWidth: 150 },
	// 是否默认
	{
		label: $t('isDefault'),
		prop: 'isDefault',
		formatter({ isDefault }) {
			return isDefault ? (
				<ElTag type={'success'}>{$t('default')}</ElTag>
			) : (
				<ElTag size={'large'} type={'danger'}>
					{$t('no_default')}
				</ElTag>
			);
		},
		minWidth: 100,
	},
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, minWidth: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, minWidth: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', minWidth: 130 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', minWidth: 130 },
	{ label: $t('table.operation'), fixed: 'right', minWidth: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	// 模板名称
	templateName: [{ required: true, message: `${$t('input')}${$t('emailTemplate_templateName')}`, trigger: 'blur' }],
	// 模板名称
	emailUser: [{ required: true, message: `${$t('input')}${$t('emailTemplate_templateName')}`, trigger: 'blur' }],
	// 主题
	subject: [{ required: true, message: `${$t('input')}${$t('emailTemplate_subject')}`, trigger: 'blur' }],
	// 邮件内容
	body: [{ required: true, message: `${$t('input')}${$t('emailTemplate_body')}`, trigger: 'blur' }],
	// 邮件类型
	type: [{ required: true, message: `${$t('input')}${$t('emailTemplate_type')}`, trigger: 'blur' }],
});
