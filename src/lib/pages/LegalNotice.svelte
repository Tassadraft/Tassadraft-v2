<script>
    import Menu from '../menu/Menu.svelte';
    import Title from '../shared/Title.svelte';
    import { t, json } from 'svelte-i18n';
    import Subtitle from '../shared/Subtitle.svelte';
    import Link from '../shared/Link.svelte';
    import Panel from '../shared/Panel.svelte';
</script>

<Menu />

<Title title={$t('legal-notice.title')} />

<div class="p-3">
    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legal-notice.editor.title')}</Subtitle>
        </div>
        <p><span class="font-bold">{$t('common.name')} :</span> {$t('common.tassadraft')}</p>
        <p><span class="font-bold">{$t('legal-notice.editor.legal-status')} :</span> {$t('legal-notice.editor.self-employed-business')}</p>
        <p><span class="font-bold">{$t('legal-notice.editor.responsible')} :</span> {process.env.VITE_COMPANY_RESPONSIBLE}</p>
        <p><span class="font-bold">{$t('common.address')} :</span> {process.env.VITE_COMPANY_ADDRESS}</p>
        <p><span class="font-bold">{$t('legal-notice.editor.siret')} :</span> {process.env.VITE_COMPANY_SIRET}</p>
        <p>
            <span class="font-bold">{$t('common.contact')} :</span>
            <Link href="mailto:tassadapi@tassadraft.com" className="text-primary-500 hover:text-white duration-300 transition-colors"
                >{process.env.VITE_TASSADAPI_CONTACT}</Link
            >
        </p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legal-notice.hosting.title')}</Subtitle>
        </div>
        <p><span class="font-bold">{$t('legal-notice.hosting.host')} :</span> {process.env.VITE_HOST_NAME}</p>
        <p><span class="font-bold">{$t('legal-notice.hosting.address')} :</span> {process.env.VITE_HOST_ADDRESS}</p>
        <p><span class="font-bold">{$t('legal-notice.hosting.rcs')} :</span> {process.env.VITE_HOST_RCS}</p>
        <p><span class="font-bold">{$t('legal-notice.hosting.capital')} :</span> {process.env.VITE_HOST_CAPITAL}</p>
        <p><span class="font-bold">{$t('legal-notice.hosting.ape-code')} :</span> {process.env.VITE_HOST_APE_CODE}</p>
        <p><span class="font-bold">{$t('legal-notice.hosting.vat-number')} :</span> {process.env.VITE_HOST_VAT_NUMBER}</p>
        <p><span class="font-bold">{$t('legal-notice.hosting.datacenter')} :</span> {process.env.VITE_HOST_DATACENTER}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legal-notice.intellectual-property.title')}</Subtitle>
        </div>
        <p>{$t('legal-notice.intellectual-property.description')}</p>
        <p><span class="italic font-semibold">Magic: The Gathering</span> {$t('legal-notice.intellectual-property.disclaimer')}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legal-notice.personal-data.title')}</Subtitle>
        </div>
        <p>{$t('legal-notice.personal-data.description')}</p>
        <p>{$t('legal-notice.personal-data.rights')}</p>
        <p>{$t('legal-notice.personal-data.contact')}
            <Link href="mailto:tassadapi@tassadraft.com" className="text-primary-500 hover:text-white duration-300 transition-colors">
                {process.env.VITE_TASSADAPI_CONTACT}
            </Link>.
        </p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legal-notice.terms-of-use.title')}</Subtitle>
        </div>
        <p>{$t('legal-notice.terms-of-use.description')}</p>
        {#if $json('legal-notice.terms-of-use.details')}
            <ul class="ml-3 mt-2">
                {#each $json('legal-notice.terms-of-use.details') as detail}
                    <li class="list-disc">{detail}</li>
                {/each}
            </ul>
        {/if}
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legal-notice.responsibility.title')}</Subtitle>
        </div>
        <p>{$t('legal-notice.responsibility.description')}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legal-notice.hyperlinks.title')}</Subtitle>
        </div>
        <p>{$t('legal-notice.hyperlinks.description')}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legal-notice.applicable-law.title')}</Subtitle>
        </div>
        <p>{$t('legal-notice.applicable-law.description')}</p>
    </Panel>
</div>
