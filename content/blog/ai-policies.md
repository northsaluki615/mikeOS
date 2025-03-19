---
title: ai-policies
description: A rant on AI Policies
date: 2024-05-24
draft: false
tags:
  - ai
  - policy
  - rant
  - cybersecurity
  - sprout
updated: 2024-08-05
---
# AI Policies

As some of you know, I work in [cybersecurity](https://mike.helmers.me/blog/cybersecurity). AI news and headlines are sweeping the world, and have gotten C-Suite types up in a tizzy. What are the security ramifications of this? Well, there's a lot to consider. Personally, impact to the workforce and privacy violations are my biggest concerns. But as I've been playing with different AI tools, I feel that most concerns, at least so far, aren't that crazy. They seem to be different flavors of traditional technology concerns. What drives me ***crazy***, is that folx want to act as if these are new concerns. They're not.
I'm all for creating policies that protect you and/or your organization, but make sure it actually has an impact.

## What is AI?

I asked ChatGPT, "What is AI?", and here's the response:
>*Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think, learn, and perform tasks typically requiring human intelligence. AI systems use algorithms and computational models to process data, recognize patterns, make decisions, and improve from experience. There are several key types of AI:*
>*1. **Narrow AI (Weak AI)**: Designed to perform a specific task, such as facial recognition or language translation. It operates under a limited set of constraints and is not capable of generalizing its knowledge to different areas.*
>*2. **General AI (Strong AI)**: Hypothetical AI that possesses the ability to understand, learn, and apply knowledge across a wide range of tasks at a level comparable to human intelligence. This type of AI does not currently exist.*
>*3. **Machine Learning (ML)**: A subset of AI that involves training algorithms on data so they can learn to make decisions or predictions. ML systems improve over time as they are exposed to more data.*
>*4. **Deep Learning**: A specialized form of machine learning that uses neural networks with many layers (hence "deep") to analyze data and make decisions. It is particularly effective for tasks such as image and speech recognition.*
>*5. **Natural Language Processing (NLP)**: A field of AI focused on the interaction between computers and humans through natural language. NLP enables machines to understand, interpret, and respond to human language in a meaningful way.*
>*AI applications are diverse and include virtual assistants, autonomous vehicles, medical diagnosis systems, recommendation engines, and more. AI technologies continue to evolve, driving innovation across various industries and transforming how we interact with technology.*

I feel that's a nice little summary. What has spurred the headlines is *Generative AI*. Again, from ChatGPT:
>*Generative AI is like a super-smart robot that can create new stuff that looks and sounds like it was made by humans. Imagine you have a machine that can draw pictures, write stories, or compose music just by learning from examples it has seen before. Here’s how it works in simple terms:*
>*1. **Learning from Examples**: The AI looks at lots of examples of something, like pictures of cats or poems. It studies these examples to understand what makes a cat picture or a poem.*
>*2. **Making New Things**: After learning, the AI can make new pictures of cats or new poems. These new creations aren’t copies of the examples it saw; they’re brand new and original.*
>*3. **Two Main Helpers**:*

- ***The Creator (Generator)**: This part tries to make something new, like drawing a new cat picture.*

> *- **The Checker (Discriminator)**: This part checks if the new creation looks real or if it’s obviously made by a machine. It helps the Creator improve by saying what looks wrong.*
>*1. **Getting Better Over Time**: The Creator and the Checker work together and get better and better. The Creator learns to make more realistic and convincing things because the Checker keeps pointing out mistakes.*
>***Examples of Generative AI**:*
>*- **Text**: Writing stories or news articles that sound like a human wrote them.*
>*- **Images**: Drawing pictures that look like real photos or creating new art.*
>*- **Music**: Composing new songs in different styles.*
>*Generative AI is like having a creative buddy that can help you come up with new ideas and make cool things, but it’s powered by smart computer programs instead of human imagination.*

I particularly like *"Generative AI is like having a creative buddy that can help you come up with new ideas and make cool things, but it’s powered by smart computer programs instead of human imagination."* This very site was built with the help of ChatGPT. It helped me learn much about [[eleventy]] and javascript, two technologies I knew next to nothing about.

## Top Concerns

So, what are the concerns around Generative AI? Here's a few that I've seen pop-up professionally.

### Hallucinations

Generative AI wants to be helpful, but it is not omniscient. There are several knowledge gaps that an AI model can have. This limit is mostly from the data that was used to train the model. So it the model was trained on data from before today, it may be out of date. Or certain datasets were just not included. In any case, AI will try to answer a question you ask to the best of it's ability.
If it doesn't know that answer, it will occasionally make it up. This is called a hallucination.

### Bias

I'm borrowing from [IBM here](https://www.ibm.com/topics/ai-bias):
"AI bias, also called machine learning bias or algorithm bias, refers to the occurrence of [biased results](https://www.ibm.com/blog/shedding-light-on-ai-bias-with-real-world-examples/) due to human biases that skew the original training data or AI algorithm—leading to distorted outputs and potentially harmful outcomes."

Basically, AI will make assumptions based off the data it has been presented. If it ingests data that indicates people who play video games like Mac 'n' Cheese, it may assume that everyone who plays video games likes Mac 'n' Cheese. NIST has a really great article [here](https://www.nist.gov/news-events/news/2022/03/theres-more-ai-bias-biased-data-nist-report-highlights).

### Sourcing of Data

This one is actually problematic to me. In the training of these AI models, companies scooped up data from everywhere. And they haven't properly credited/compensated the people/organizations who's data they used. So, in theory, ChatGPT could provide an answer or some writing that isn't theirs to give away.

### Handling of Confidential and Sensitive Data

The final concern I'm going to talk about is confidential and sensitive data. When using the free version of ChatGPT, OpenAI (ChatGPT's parent company) they have the right to use anything you upload/type to train future AI models. You upload some code that is proprietary, it may show up in a future model.

## The Wikipedia Test

We've talked about four concerns around AI. Now, you create a policy so that employees understand the expectations around the use of AI. I want you to now do  the following:

1. Perform a find and replace for AI, and replace it with Wikipedia
2. Does the policy still make sense?
3. If it does, you have a bad policy.
Why is it a bad policy? This means it's vague. Your existing authorized use policy (AUP) should all ready stop your employees from:

- Hallucinations AKA Fact checking
- Biases  AKA Fact Checking
- Sourcing of Data AKA Citing your sources
- Handling of Confidential and Sensitive Data AKA not sharing privileged information

## A better way

Write an all-encompassing AUP that requires your employees to fact-check their work. Make sure they don't share your company's data with places they shouldn't. Make sure proper citation is used. These are all basic tenets of a functional organization. These shouldn't just be AI concerns, these should be EVERYTHING concerns. I used Wikipedia as an example for the find and replace rule because back when I was in college, Wikipedia was new. It was scary, and many of my professors wouldn't allow us to use it. Now, Wikipedia is (mostly) well respected. Many of the AI concerns I've see discussed sound exactly like the concerns academics had around Wikipedia. It's new, but doesn't need to be scary. A tempered approach where policy makers breathe before responding to headlines is the way to go.
