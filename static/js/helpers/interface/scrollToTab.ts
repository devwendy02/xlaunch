export const scrollToTab = (tab: string) => {
  const activeTabSection = document.querySelector(`.tab-pane.${tab}`);
  setTimeout(() => {
    if (activeTabSection) {
      activeTabSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }
  });
};
