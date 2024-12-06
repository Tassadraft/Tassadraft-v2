<script>
    import Menu from '../menu/Menu.svelte';
    import Title from '../shared/Title.svelte';
    import { t, json } from 'svelte-i18n';
    import Subtitle from '../shared/Subtitle.svelte';
    import Link from '../shared/Link.svelte';
    import Panel from '../shared/Panel.svelte';
</script>

<Menu />

<Title title={$t('legals.title')} />

<div class="p-3">
    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legals.editor.title')}</Subtitle>
        </div>
        <p><span class="font-bold">{$t('common.name')} :</span> {$t('common.tassadraft')}</p>
        <p><span class="font-bold">{$t('legals.editor.legal-status')} :</span> {$t('legals.editor.self-employed-business')}</p>
        <p><span class="font-bold">{$t('legals.editor.responsible')} :</span> {process.env.VITE_COMPANY_RESPONSIBLE}</p>
        <p><span class="font-bold">{$t('common.address')} :</span> {process.env.VITE_COMPANY_ADDRESS}</p>
        <p><span class="font-bold">{$t('legals.editor.siret')} :</span> {process.env.VITE_COMPANY_SIRET}</p>
        <p>
            <span class="font-bold">{$t('common.contact')} :</span>
            <Link href="mailto:tassadapi@tassadraft.com" className="text-primary-500 hover:text-white duration-300 transition-colors"
                >{process.env.VITE_TASSADAPI_CONTACT}</Link
            >
        </p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legals.hosting.title')}</Subtitle>
        </div>
        <p><span class="font-bold">{$t('legals.hosting.host')} :</span> {process.env.VITE_HOST_NAME}</p>
        <p><span class="font-bold">{$t('legals.hosting.address')} :</span> {process.env.VITE_HOST_ADDRESS}</p>
        <p><span class="font-bold">{$t('legals.hosting.rcs')} :</span> {process.env.VITE_HOST_RCS}</p>
        <p><span class="font-bold">{$t('legals.hosting.capital')} :</span> {process.env.VITE_HOST_CAPITAL}</p>
        <p><span class="font-bold">{$t('legals.hosting.ape-code')} :</span> {process.env.VITE_HOST_APE_CODE}</p>
        <p><span class="font-bold">{$t('legals.hosting.vat-number')} :</span> {process.env.VITE_HOST_VAT_NUMBER}</p>
        <p><span class="font-bold">{$t('legals.hosting.datacenter')} :</span> {process.env.VITE_HOST_DATACENTER}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legals.intellectual-property.title')}</Subtitle>
        </div>
        <p>{$t('legals.intellectual-property.description')}</p>
        <p><span class="italic font-semibold">Magic: The Gathering</span> {$t('legals.intellectual-property.disclaimer')}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legals.personal-data.title')}</Subtitle>
        </div>
        <p>{$t('legals.personal-data.description')}</p>
        <p>{$t('legals.personal-data.rights')}</p>
        <p>{$t('legals.personal-data.contact')}
            <Link href="mailto:tassadapi@tassadraft.com" className="text-primary-500 hover:text-white duration-300 transition-colors">
                {process.env.VITE_TASSADAPI_CONTACT}
            </Link>.
        </p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legals.terms-of-use.title')}</Subtitle>
        </div>
        <p>{$t('legals.terms-of-use.description')}</p>
        {#if $json('legals.terms-of-use.details')}
            <ul class="ml-3 mt-2">
                {#each $json('legals.terms-of-use.details') as detail}
                    <li class="list-disc">{detail}</li>
                {/each}
            </ul>
        {/if}
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legals.responsibility.title')}</Subtitle>
        </div>
        <p>{$t('legals.responsibility.description')}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legals.hyperlinks.title')}</Subtitle>
        </div>
        <p>{$t('legals.hyperlinks.description')}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('legals.applicable-law.title')}</Subtitle>
        </div>
        <p>{$t('legals.applicable-law.description')}</p>
    </Panel>
</div>
