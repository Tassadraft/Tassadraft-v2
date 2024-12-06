<script>
    import Menu from '../menu/Menu.svelte';
    import Title from '../shared/Title.svelte';
    import { t, json } from 'svelte-i18n';
    import Subtitle from '../shared/Subtitle.svelte';
    import Panel from '../shared/Panel.svelte';

    export let isModal = false;
</script>

{#if !isModal}
    <Menu />
    <Title title={$t('terms-and-conditions.title')} />
{/if}

<div class="p-3">
    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('terms-and-conditions.object.title')}</Subtitle>
        </div>
        <p>{$t('terms-and-conditions.object.description')}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('terms-and-conditions.description.title')}</Subtitle>
        </div>
        <p>{$t('terms-and-conditions.description.description')}</p>
        {#if $json('terms-and-conditions.description.details')}
            <ul class="ml-3 mt-2">
                {#each $json('terms-and-conditions.description.details') as detail}
                    <li class="list-disc">{detail}</li>
                {/each}
            </ul>
        {/if}
        <Panel>
            <div class="mb-3">
                <Subtitle>{$t('terms-and-conditions.description.open-source.title')}</Subtitle>
            </div>
            <p>{$t('terms-and-conditions.description.open-source.description')}</p>
        </Panel>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('terms-and-conditions.access.title')}</Subtitle>
        </div>
        {#if $json('terms-and-conditions.access.object')}
            <ul class="ml-3 mt-2">
                {#each $json('terms-and-conditions.access.object') as detail}
                    <li class="list-disc">{detail}</li>
                {/each}
            </ul>
        {/if}
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('terms-and-conditions.subscription.title')}</Subtitle>
        </div>
        <p>{$t('terms-and-conditions.subscription.description')}</p>
        {#if $json('terms-and-conditions.subscription.object')}
            <ul class="ml-3 mt-2">
                {#each $json('terms-and-conditions.subscription.object') as detail}
                    <li class="list-disc">{detail}</li>
                {/each}
            </ul>
        {/if}
        <Panel>
            <div class="mb-3">
                <Subtitle>{$t('terms-and-conditions.subscription.payment.title')}</Subtitle>
            </div>
            <p>{$t('terms-and-conditions.subscription.payment.description')}</p>
        </Panel>
        <Panel>
            <div class="mb-3">
                <Subtitle>{$t('terms-and-conditions.subscription.end-subscription.title')}</Subtitle>
            </div>
            <p>{$t('terms-and-conditions.subscription.end-subscription.renew')}</p>
            <p>{$t('terms-and-conditions.subscription.end-subscription.cancel')}</p>
        </Panel>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('terms-and-conditions.tassadapi.title')}</Subtitle>
        </div>
        <p>{$t('terms-and-conditions.tassadapi.description')}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('terms-and-conditions.user-responsibility.title')}</Subtitle>
        </div>
        <p>{$t('terms-and-conditions.user-responsibility.description')}</p>
        {#if $json('terms-and-conditions.user-responsibility.object')}
            <ul class="ml-3 mt-2">
                {#each $json('terms-and-conditions.user-responsibility.object') as detail}
                    <li class="list-disc">{detail}</li>
                {/each}
            </ul>
        {/if}
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('terms-and-conditions.intellectual-propriety.title')}</Subtitle>
        </div>
        <p>{$t('terms-and-conditions.intellectual-propriety.api')}</p>
        <p>{$t('terms-and-conditions.intellectual-propriety.clients')}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('terms-and-conditions.app-responsibility.title')}</Subtitle>
        </div>
        <p>{$t('terms-and-conditions.app-responsibility.description')}</p>
        {#if $json('terms-and-conditions.app-responsibility.object')}
            <ul class="ml-3 my-2">
                {#each $json('terms-and-conditions.app-responsibility.object') as detail}
                    <li class="list-disc">{detail}</li>
                {/each}
            </ul>
        {/if}
        <p>{$t('terms-and-conditions.app-responsibility.tassadraft-not-responsible')}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('terms-and-conditions.data.title')}</Subtitle>
        </div>
        <Panel>
            <div class="mb-3">
                <Subtitle>{$t('terms-and-conditions.data.collected.title')}</Subtitle>
            </div>
            {#if $json('terms-and-conditions.data.collected.object')}
                <ul class="ml-3 mt-2">
                    {#each $json('terms-and-conditions.data.collected.object') as detail}
                        <li class="list-disc">{detail}</li>
                    {/each}
                </ul>
            {/if}
        </Panel>
        <Panel>
            <div class="mb-3">
                <Subtitle>{$t('terms-and-conditions.data.goals.title')}</Subtitle>
            </div>
            {#if $json('terms-and-conditions.data.collected.object')}
                <ul class="ml-3 my-2">
                    {#each $json('terms-and-conditions.data.goals.object') as detail}
                        <li class="list-disc">{detail}</li>
                    {/each}
                </ul>
            {/if}
            <p>{$t('terms-and-conditions.data.goals.details')}</p>
        </Panel>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('terms-and-conditions.contributions.title')}</Subtitle>
        </div>
        <p>{$t('terms-and-conditions.contributions.description')}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('terms-and-conditions.support.title')}</Subtitle>
        </div>
        <p>{$t('terms-and-conditions.support.description')}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('terms-and-conditions.cancellation.title')}</Subtitle>
        </div>
        <p>{$t('terms-and-conditions.cancellation.description')}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('terms-and-conditions.update.title')}</Subtitle>
        </div>
        <p>{$t('terms-and-conditions.update.description')}</p>
    </Panel>

    <Panel>
        <div class="mb-3">
            <Subtitle>{$t('terms-and-conditions.right.title')}</Subtitle>
        </div>
        <p>{$t('terms-and-conditions.right.description')}</p>
    </Panel>
</div>
