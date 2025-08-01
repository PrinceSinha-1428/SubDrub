import dayjs from 'dayjs';
import {createRequire} from 'module';
import Subscription from '../models/subscription.model.js';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');

const REMINDERS = [7,5,2,1];

const fetchSubscription = async (context,subscriptionId) => {
    return await context.run('get subscription',() => {
        return Subscription.findById(subscriptionId).populate('user','name email');
    })
}



export const sendReminders = serve(async (context) => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context,subscriptionId);
    if(!subscription || subscription.status !== active) return;
    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())){
        console.log(`Subscription date has passes for subscription ${subscriptionId}. Stopping Workflow`);
        return;
    }
    for(const daysbefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysbefore, 'day');
        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context,`Reminder ${daysbefore} days before`, reminderDate)
        }
        await triggerReminder(context, `Reminder ${daysbefore} days before`);
    }
});


const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
    })
}