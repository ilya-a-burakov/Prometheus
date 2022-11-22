<template>
  <section id="howtobuy" class="section">
    <div class="mn-big t-center title">
      <h2 class="">🙋 Most Popular Questions</h2>
    </div>
    <div class="cols-3">

      <div class="step">
        <h4 class="mn-medium">How often are the master classes held? How to get to you?</h4>
        <p>
          We hold them every day from 11:00 a.m. to 9:00 p.m. To make an appointment, simply call us: +995 585 888 660.
        </p>
      </div>

      <div class="step">
        <h4 class="mn-medium">I have never sculpted before and am generally not "creative" at all. Can I come to you for a master class?</h4>
        <p>
          Of course! More than 80% of our guests are getting acquainted with our pottery circle for the first time. Experienced craftsmen, whom we are proud of, will tell and show you everything in an accessible way, even if you are far from any creativity - don't be afraid, come!
        </p>
      </div>

      <div class="step">
        <h4 class="mn-medium">What will I be able to do at the master class?</h4>
        <p>
          All studios have shelves with samples for inspiration - you can take something from them as an example or come up with something yourself! Mugs, bowls, candlesticks, milk jugs, pots, plates, bells, animal circles - it's up to you! In one class, you can make 1-3 products both on the wheel and at the table.
        </p>
      </div>

      <div class="step">
        <h4 class="mn-medium">Will I practice alone or will someone else be with me?</h4>
        <p>
          In addition to you, up to 5 people can be registered for one master class. This optimal number of guests - the master's attention and time will be enough for everyone. If you want a more individual approach, we recommend coming to us on weekdays.
        </p>
      </div>

      <div class="step">
        <h4 class="mn-medium">Will I be able to pick up my products right away?</h4>
        <p>
          Unfortunately, there is no. Our master class is only a small part of what clay has to go through to become a full-fledged dish. For the time being, your products remain with us, where they are dried, washed and fired - you will be able to pick them up in about 3-4 weeks.
        </p>
      </div>

      <div class="step">
        <h4 class="mn-medium">How many years can I come to you?</h4>
        <p>
          They come to us from the age of three. Children 3-4 years old must practice under the supervision of their parents and sit in the circle at the discretion of the master. It should also be taken into account that the class may last less than the specified time =)
        </p>
      </div>

    </div>
  </section>
</template>


<script>
export default {
  data() {
    return {};
  },
  name: "InstructionSection",
  props: {},
  methods: {},
  mounted() {},
};
</script>

<style lang="scss">
#howtobuy {
    .step {
      display: block;

      padding: 1.875rem;

      width: 100%;

      background: #F4F7FF;

      border-radius: 1rem;
      overflow: hidden;

      h4 {
        font-size: 1.125rem;
        text-transform: none;
        letter-spacing: 0;
        line-height: 1;
      }

      a { color: #2266FF; text-decoration: underline; }
    }

  .button { margin: 0 auto; }
}
</style>
