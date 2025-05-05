import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, Row, Col } from "antd";
import { AnimatePresence, motion } from "framer-motion";

const gardenData = [
  { id: 1, word: "Abundance", status: "planted" },
  { id: 2, word: "Benevolent", status: "planted" },
  { id: 3, word: "Courage", status: "planted" },
  { id: 4, word: "Diligent", status: "not-planted" },
  { id: 5, word: "Empathy", status: "not-planted" },
  { id: 6, word: "Fortitude", status: "not-planted" },
];

const GardenPage = () => {
  const [garden, setGarden] = useState(gardenData);
  const [selectedWord, setSelectedWord] = useState(null);

  const handleWordClick = (word) => {
    setSelectedWord(word);
  };

  const handlePlantNewWord = (word) => {
    const newGarden = garden.map((item) => {
      if (item.word === word) {
        item.status = "planted";
      }
      return item;
    });
    setGarden(newGarden);
  };

  return (
    <div className="garden-page-container" style={{ padding: "20px" }}>
      <h1>Vocabulary Garden</h1>

      <p>Plant words you’ve learned and watch them grow!</p>

      <Row gutter={16} justify="center" style={{ marginTop: "20px" }}>
        {garden.map((wordData) => (
          <Col span={8} key={wordData.id}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: wordData.status === "planted" ? 1 : 0.6 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                hoverable
                style={{
                  textAlign: "center",
                  backgroundColor:
                    wordData.status === "planted" ? "#e2f7e1" : "#f5f5f5",
                  borderRadius: "12px",
                  padding: "16px",
                  cursor:
                    wordData.status === "not-planted" ? "pointer" : "default",
                }}
                onClick={() =>
                  wordData.status === "not-planted" &&
                  handleWordClick(wordData.word)
                }
              >
                <h3>{wordData.word}</h3>
                {wordData.status === "planted" ? (
                  <p style={{ color: "#4caf50" }}>Planted! 🌱</p>
                ) : (
                  <p style={{ color: "#ff9800" }}>Not Planted 🌾</p>
                )}
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="word-details-popup"
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              <h2>{selectedWord}</h2>
              <p>
                {`Learn the word: ${selectedWord} - A great word to enhance your vocabulary!`}
              </p>
              <Button
                type="primary"
                onClick={() => handlePlantNewWord(selectedWord)}
                style={{ marginTop: "10px" }}
              >
                Plant this Word 🌱
              </Button>
              <Button
                style={{ marginTop: "10px", marginLeft: "10px" }}
                onClick={() => setSelectedWord(null)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GardenPage;
