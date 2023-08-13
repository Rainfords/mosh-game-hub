import GameCard from "@components/GameCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GameCard> = {
  component: GameCard,
};

export default meta;
type Story = StoryObj<typeof GameCard>;

export const Basic: Story = {
  args: {
    game: {
      id: 1,
      metacritic: 98,
      background_image:
        "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
      name: "Grand Theft Auto V",
      parent_platforms: [
        {
          platform: {
            id: 187,
            name: "PlayStation 5",
            slug: "playstation",
          },
        },
        {
          platform: {
            id: 188,
            name: "Xbox One",
            slug: "xbox",
          },
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100px", width: "300px" }}>
        <Story />
      </div>
    ),
  ],
};
